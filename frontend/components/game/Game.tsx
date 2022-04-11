import Auction from "./Auction"
import Hand from "./Hand"
import Player from "./Player"
import ScoreBoard from "./ScoreBoard"

interface GameProps {

}

const cards = [
    {
        suit: 'duba',
        value: 0
    }, {
        suit: 'rosu',
        value: 3
    }, {
        suit: 'ghinda',
        value: 11
    }, {
        suit: 'verde',
        value: 10
    }
]

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
                cards={cards}
            />
            <ScoreBoard team1Points={68} team1PointsTotal={12} team2Points={44} team2PointsTotal={17}/>
        </div>
    )
}