import axios from "axios";
import { User } from "firebase/auth";
import { IGame } from "types/game";
import { shuffleCards } from "utils/dealCards";

export async function getGameState(id: string) {
    const url = `http://localhost:3000/api/game/${id}`;

    return await axios.get(url);
}

export async function createNewGame(id: string, user: User) {
    const url = `http://localhost:3000/api/game`;

    const cards = shuffleCards();

    const game: IGame = {
        gameId: id,
        team1Score: 0,
        team2Score: 0,
        joined: 1,
        players: [
            {
                uid: user.uid,
                name: user.displayName,
                photo: user.photoURL,
            }
        ],
        round: {
            turn: 0,
            playerTurn: 0,
            playerCards: cards,
            auction: {
                playerAuction: [0, 0, 0, 0],
                value: 0
            },
            trumpCard: '',
            team1Points: 0,
            team2Points: 0,
            team1Cheated: false,
            team2Cheated: false
        }
    }

    return await axios.post(url, game)
}