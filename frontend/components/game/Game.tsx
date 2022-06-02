import { GameContext } from "contexts/GameContext"
import { useUser } from "contexts/UserContext"
import { useEffect, useState } from "react"
import { getGameState } from "services/game"
import { IGame, ITable, IUser } from "types/game"
import Auction from "./Auction"
import Buttons from "./Buttons"
import Hand from "./Hand"
import Player from "./Player"
import ScoreBoard from "./ScoreBoard"
import Trump from "./Trump"

interface GameProps {
    id: string;
    table: ITable;
}

export default function Game({ id, table }: GameProps) {
    const [state, setState] = useState<IGame>({} as IGame);
    const [playerIndex, setPlayerIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const [gamePoll, setGamePoll] = useState(0);

    const { user } = useUser();

    useEffect(() => {
        getGameState(id)
            .then(res => {
                const gameSession: IGame = res.data
                setState(gameSession);
                const index = gameSession.players.findIndex(p => p.uid === user.uid)
                setPlayerIndex(index < 0 ? 0 : index);
                setIsLoading(false);

                setTimeout(() => {
                    setGamePoll(gamePoll + 1);
                }, 3000)
            })
            .catch(err => console.log(err));
    
    }, [gamePoll, user])

    return (
        <div className="relative w-full h-full">
            {isLoading || 
                <GameContext.Provider value={{game: state, table: table, id: id}}>
                    <div className="absolute h-full w-full flex items-center justify-center">
                        <div className="relative h-3/4 aspect-square bg-dark-2 rounded-full">
                            <Player position={-playerIndex+0} index={0} isJoined={state.joined > 0}/>
                            <Player position={-playerIndex+1} index={1} isJoined={state.joined > 1}/>
                            <Player position={-playerIndex+2} index={2} isJoined={state.joined > 2}/>
                            <Player position={-playerIndex+3} index={3} isJoined={state.joined > 3}/>
                            <Trump trump={state.round.trump} />
                        </div>
                    </div>
                    <Auction 
                        bidMax={state.round.auction.value}
                        playerIndex={playerIndex}
                        trick={state.round.trick}
                        isVisible={playerIndex === state.round.playerTurn && state.round.trick === 0}
                    />
                    <Hand 
                        playerIndex={playerIndex}
                    />
                    <ScoreBoard team1Points={state.round.team1Points} team1Score={state.team1Score} team2Points={state.round.team2Points} team2Score={state.team2Score}/>
                    <Buttons isCheatMode={table.cheating} joined={state.joined} id={id}/>
                </GameContext.Provider>
            }
        </div>
    )
}