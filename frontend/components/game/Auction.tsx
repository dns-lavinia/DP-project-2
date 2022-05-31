interface AuctionProps {
    value: number;
    playerIndex: number;
    playerTurn: number;
    turn: number;
}

export default function Auction({ value, playerIndex, playerTurn, turn }: AuctionProps) {
    const visible = playerIndex === playerTurn && turn === 0;

    return (
        <div className="absolute w-full h-full flex gap-4 items-center justify-center">
            {visible && <>
                <AuctionValue value={0}  playerIndex={playerIndex} />
                {[...Array(value)].map((_, index) => (
                    <AuctionValue key={index} value={index + 1} playerIndex={playerIndex} disabled/>
                ))}
                {[...Array(4 - value)].map((_, index) => (
                    <AuctionValue key={index} value={value + index + 1}  playerIndex={playerIndex} />
                ))}
            </>}
        </div>
    )
}

interface AuctionValueProps {
    value: number;
    playerIndex: number
    disabled?: boolean;
}

function AuctionValue({ value, playerIndex, disabled }: AuctionValueProps) {
    const handleBid = () => {

    }

    return (
        <button className={`w-24 h-24 rounded-full bg-dark-1 flex items-center justify-center text-5xl font-mono cursor-pointer transition-colors
            hover:bg-purple-300 hover:text-dark-1 ${disabled && 'pointer-events-none'}`}
            onClick={handleBid}
            disabled={disabled}
        >
            {disabled || value}
        </button>
    )
}