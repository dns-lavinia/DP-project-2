import type { ICard } from "types/game";

interface CardProps extends ICard {}

export default function Card({ suit, value }: CardProps) {
    return (
        <div className="bg-dark-1 rounded-3xl cursor-pointer p-4 shadow-purple-300 shadow-lg transition-transform
            hover:-translate-y-20"
        >
            <div className="w-56 h-96 rounded-xl border border-purple-300 flex flex-col divide-y divide-purple-300 justify-center">
                <div>
                    {suit}
                </div>
                <div>
                    {value}
                </div>
            </div>
        </div>
    )
}