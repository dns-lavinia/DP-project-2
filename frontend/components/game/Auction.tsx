interface AuctionProps {
    value: number;
}

export default function Auction({ value }: AuctionProps) {
    return (
        <div className="absolute w-full h-full flex gap-4 items-center justify-center">
            <AuctionValue value={0} />
            {[...Array(value)].map((_, index) => (
                <AuctionValue key={index} value={index + 1} disabled/>
            ))}
            {[...Array(4 - value)].map((_, index) => (
                <AuctionValue key={index} value={value + index + 1} />
            ))}
        </div>
    )
}

interface AuctionValueProps {
    value: number;
    disabled?: boolean;
}

function AuctionValue({ value, disabled }: AuctionValueProps) {
    return (
        <div className={`w-24 h-24 rounded-full bg-dark-1 flex items-center justify-center text-5xl font-mono cursor-pointer transition-colors
            hover:bg-purple-300 hover:text-dark-1 ${disabled && 'pointer-events-none'}`}
        >
            {disabled || value}
        </div>
    )
}