import { Server, Socket } from "socket.io";
import { IGame } from "types/game";
import { accuseCheating, endGame, endRound, endTrick, playAuction, playCard } from "utils/game_moves";
import { createGame } from "utils/game_moves";

const state: {[key: string]: IGame} = {}
const rooms: {[key: string]: string}  = {}

const numbers: {[key: string]: number} = {}

export default function SocketHandler(req: any, res: any) {
    if (res.socket.server.io) {
        console.log('Socket running')
    }
    else {
        console.log('Socket starting')
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.of('/chat').on('connection', (socket) => {
            socket.on('message-sent', ({messages, message}) => {
                console.log('message-sent')
                socket.broadcast.emit('message-received', {messages, message});
            })
        })

        io.of('/game').on('connection', (socket) => {
            console.log('game', socket.id)

            socket.on('create-game', ({gameId, user}) => {
                console.log('create-game', gameId)
                rooms[socket.id] = gameId
                state[gameId] = createGame(gameId)
                state[gameId].players.push(user)

                numbers[socket.id] = 1;
                socket.join(gameId)
            })

            socket.on('join-game', ({gameId, user}) => {
                const room = io.of('/game').adapter.rooms.get(gameId);

                console.log('join-game', gameId, room)

                if (!room) {
                    socket.emit('unknown-game');
                    return
                }

                const numClients = room.size;

                if ( numClients > 4 ) {
                    socket.emit('full-game');
                    return
                }

                rooms[socket.id] = gameId

                numbers[socket.id] = room.size + 1;
                socket.join(gameId)

                state[gameId].players.push(user)
                io.of('/game').to(gameId).emit('game-update', state[gameId])
            })

            // socket.on('leave-game', gameId => {
            //     console.log('leave-game', gameId)
            //     socket.leave(gameId)
            //     io.of('/game').to(gameId).emit('kick')
            // })

            socket.on('request-game-state', gameId => {
                console.log('request-game-state', gameId)
                socket.emit('game-setup', {game: state[gameId], index: numbers[socket.id] - 1});
            })

            socket.on('play-auction', ({gameId, playerTurn, bid})  => {
                console.log('play-auction', gameId, playerTurn, bid)
                playAuction(state[gameId], playerTurn, bid)
                io.of('/game').to(gameId).emit('game-update', state[gameId]);
            })

            socket.on('play-card', async ({gameId, playerTurn, cardIndex, card, isCheating, scoreToWin}) => {
                console.log('play-card', gameId, playerTurn, cardIndex, card, isCheating)
                const isTrickOver = playCard(state[gameId], playerTurn, cardIndex, card, isCheating)
                io.of('/game').to(gameId).emit('game-update', state[gameId]);
                
                if (!isTrickOver) return
                await new Promise(resolve => setTimeout(resolve, 1000))
                const isRoundOver = endTrick(state[gameId])
                io.of('/game').to(gameId).emit('game-update', state[gameId]);

                if (!isRoundOver) return
                const isGameOver = endRound(state[gameId], scoreToWin)
                io.of('/game').to(gameId).emit('game-update', state[gameId]);

                if (!isGameOver) return
                const outcome = endGame(state[gameId], scoreToWin)
                io.of('/game').to(gameId).emit('game-over', outcome);
            })

            socket.on('accuse-cheating', ({gameId, playerIndex}) => {
                console.log('accuse-cheating', gameId, playerIndex)
                accuseCheating(state[gameId], playerIndex)
                io.of('/game').to(gameId).emit('game-update', state[gameId]);
            })
        })
    }

    res.end()
}