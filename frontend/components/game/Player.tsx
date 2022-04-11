interface PlayerProps {
    position: number;
    angle: number;
}

export default function Player({ position, angle }: PlayerProps) {
    const radius = 555;
    
    const x = radius * Math.cos(angle);
    const y = -radius * Math.sin(angle); 

    console.log(x, y);

    const style = {
        transform: `translate(${x}px, ${y}px)`
    }
    
    return (
        <div className="absolute h-full w-full flex items-center justify-center">
            <div className="w-36 h-36 bg-dark-1 rounded-full flex items-center justify-center"
                style={style}
            >
                ???
            </div>
        </div>
    )
}