import { useUser } from "contexts/UserContext"
import { useEffect, useState } from "react"
import { getGameState } from "services/game"
import { IGame } from "types/game"
import Auction from "./Auction"
import Buttons from "./Buttons"
import Hand from "./Hand"
import Player from "./Player"
import ScoreBoard from "./ScoreBoard"

interface GameProps {
    id: string;
}

export default function Game({ id }: GameProps) {
    const [state, setState] = useState<IGame>({} as IGame);
    const [playerIndex, setPlayerIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useUser();

    useEffect(() => {
        getGameState(id)
            .then(res => {
                setState(res.data);
                setPlayerIndex(res.data.joined - 1);
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    
    }, [])

    return (
        <div className="relative w-full h-full">
            {isLoading || <>
                <div className="absolute h-full w-full flex items-center justify-center">
                    <div className="relative h-3/4 aspect-square bg-dark-2 rounded-full">
                        <Player position={playerIndex+0} player={state.players[(playerIndex+0)%4]} isJoined={state.joined >= 1}/>
                        <Player position={playerIndex+1} player={state.players[(playerIndex+1)%4]} isJoined={state.joined >= 2}/>
                        <Player position={playerIndex+2} player={state.players[(playerIndex+2)%4]} isJoined={state.joined >= 3}/>
                        <Player position={playerIndex+3} player={state.players[(playerIndex+3)%4]} isJoined={state.joined >= 4}/>
                    </div>
                </div>
                <Auction 
                    value={state.round.auction.value}
                    playerIndex={playerIndex}
                    playerTurn={state.round.playerTurn}
                    turn={state.round.turn}
                />
                <Hand 
                    cards={state.round.playerCards[playerIndex]}
                />
                <ScoreBoard team1Points={state.round.team1Points} team1Score={state.team1Score} team2Points={state.round.team2Points} team2Score={state.team2Score}/>
                <Buttons isCheatMode={true} joined={1}/>
            </>}
        </div>
    )
}