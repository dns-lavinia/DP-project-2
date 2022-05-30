import axios from "axios"
import { useWindowDimensions } from "hooks/hooks"
import { useEffect, useState } from "react"
import { ICard, IGame, IGameHand, IGameRound, IGameRoundCards, ITable } from "types/game"
import { DealCards } from "utils/dealCards"
import Auction from "./Auction"
import Buttons from "./Buttons"
import Hand from "./Hand"
import Player from "./Player"
import ScoreBoard from "./ScoreBoard"

interface GamePageProps {
    id: string;
}

export default function Game({id } : GamePageProps) {
    const cards : IGameRoundCards= DealCards(4);
    const dealtCards : ICard[] = [];
    const empty : IGame = {
        id: 0,
        size: 4,
        joined: 0,
        time: 0,
        points: 0,
        password: false,
        cheating: false,
        bigger: false,
    }
    const [table, setTable] = useState<ITable>() 
    const [game, postGame] = useState<IGame>(empty) 

    useEffect(() =>{
        const fetchData= async () => {
            const result= await axios.get(`http://localhost:3000/api/tables/${id}`);

            setTable(result.data);
            console.log(table);
            
            const postData= async () => {
                const res= await axios.post(`http://localhost:3000/api/game`, {
                    id: result.data.id,
                    size: 4,
                    joined: result.data.joined,
                    time: result.data.time,
                    points: result.data.points,
                    password: result.data.password? true : false,
                    cheating: result.data.cheating,
                    bigger: result.data.bigger,
                });
    
                setTable(res.data);
            }  

            postData();
        }
        
        fetchData();
    }, []);

    const hand: IGameHand ={
        firstPlayer: '',
        currentPlayer: '',
        winnerPlayer: '',
        handPoints: 0,
        dealtCards: dealtCards
    };
    const roundDetails : IGameRound= {
        deck: cards,
        tromf: '',
        team1Score: 0,
        team2Score: 0,
        team1Points: 0,
        team2Points: 0,
        pointsChosen: 0,
        teamPoints: 0,
        gameRules: game,
        team1Cheated: false,
        team2Cheated: false,
        hand: hand
    };

    // console.log(roundDetails);

    return (
        <div className="relative w-full h-full">
            <div className="absolute h-full w-full flex items-center justify-center">
                <div className="relative h-3/4 aspect-square bg-dark-2 rounded-full">
                    <Player position={0} angle={0} />
                    <Player position={1} angle={Math.PI / 2} />
                    <Player position={2} angle={Math.PI} />
                    <Player position={3} angle={Math.PI * 3 / 2} />
                </div>
            </div>
            <Auction value={roundDetails.teamPoints}/>
            <Hand 
                cards={cards.player1}
            />
            <ScoreBoard team1Points={roundDetails.team1Points} team1Score={roundDetails.team1Score} team2Points={roundDetails.team2Points} team2Score={roundDetails.team2Score}/>
            <Buttons isCheatMode={game.cheating} joined={game.joined} id={game.id}/>
        </div>
    )
}