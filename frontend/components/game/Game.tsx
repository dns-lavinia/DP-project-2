import { useWindowDimensions } from "hooks/hooks"
import { useState } from "react"
import { ICard, IGameHand, IGameRound, IGameRoundCards } from "types/game"
import { DealCards } from "utils/dealCards"
import Auction from "./Auction"
import Buttons from "./Buttons"
import Hand from "./Hand"
import Player from "./Player"
import ScoreBoard from "./ScoreBoard"

const cards : IGameRoundCards= DealCards(4);
const dealtCards : ICard[] = [];
// const game : IGame ;
// const hand: IGameHand ={
//     firstPlayer: '',
//     currentPlayer: '',
//     winnerPlayer: '',
//     handPoints: 0,
//     dealtCards: dealtCards
// };
// const roundDetails : IGameRound= {
//     deck: cards,
//     tromf: '',
//     team1Score: 0,
//     team2Score: 0,
//     team1Points: 0,
//     team2Points: 0,
//     pointsChosen: 0,
//     teamPoints: 0,
//     gameRules: game,
//     team1Cheated: false,
//     team2Cheated: false,
// };

export default function Game() {
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
            <Auction value={1}/>
            <Hand 
                cards={cards.player1}
            />
            <ScoreBoard team1Points={68} team1Score={12} team2Points={44} team2Score={17}/>
            <Buttons isCheatMode={true} />
        </div>
    )
}