import Wait from "components/common/Wait";
import { useGame } from "contexts/GameContext";
import { useWindowDimensions } from "hooks/hooks";
import { IUser } from "types/game";

interface PlayerProps {
    position: number;
    index: number;
    isJoined: boolean;
}

export default function Player({ position, index, isJoined }: PlayerProps) {
    const { game } = useGame()

    const { height } = useWindowDimensions()
    
    const radius = height / 2 - 90  
    const angle = -(position + 1) * Math.PI / 2
    const x =  radius * Math.cos(angle)
    const y = -radius * Math.sin(angle)

    const style = {
        transform: `translate(${x}px, ${y}px)`
    }
    
    return (
        <div className="absolute h-full w-full flex items-center justify-center">
            <div className="relative">
                {isJoined ?
                    <div className="relative w-36 h-36 rounded-full overflow-hidden"
                        style={style}
                    >
                        <div className="absolute bg-dark-1 border-4 border-purple-300 w-full h-full rounded-full flex items-center justify-center text-7xl font-mono font-bold">
                            {game.round.auction.bids[index]}
                        </div>
                        <img className="w-full h-full"
                            src={game.players[index]?.photo ?? ''}
                            alt={game.players[index]?.name ?? 'Anon'}
                        />
                    </div> :
                    <div className="w-36 h-36 bg-dark-1 rounded-full flex items-center justify-center"
                        style={style}
                    >
                        <Wait />
                    </div>
                }
            </div>
        </div>
    )
}