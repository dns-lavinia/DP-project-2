import Wait from "components/common/Wait";
import { useWindowDimensions } from "hooks/hooks";
import { IUser } from "types/game";

interface PlayerProps {
    position: number;
    player: IUser;
    isJoined: boolean;
}

export default function Player({ position, player, isJoined }: PlayerProps) {
    const angle = -(position + 1) * Math.PI / 2
    const { height } = useWindowDimensions()

    const radius = height / 2 - 90 
    
    const x = radius * Math.cos(angle);
    const y = -radius * Math.sin(angle);

    const style = {
        transform: `translate(${x}px, ${y}px)`
    }
    
    return (
        <div className="absolute h-full w-full flex items-center justify-center">
            {isJoined ? 
                <img className="w-36 h-36 rounded-full"
                    src={player?.photo ?? ''}
                    alt={player?.name ?? ''}
                    style={style}
                /> :
                <div className="w-36 h-36 bg-dark-1 rounded-full flex items-center justify-center"
                    style={style}
                >
                    <Wait />
                </div>
            }
        </div>
    )
}