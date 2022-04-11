import { ICard } from "types/game";
import Card from "./Card";

interface HandProps {
    cards: ICard[];
}

export default function Hand({ cards }: HandProps) {
    return (
        <div className="absolute flex justify-center -bottom-20 w-full">
            {cards.map(({suit, value}, index) => (
                <Card 
                    key={index} 
                    suit={suit}
                    value={value} 
                />
            ))}
        </div>
    )
}