import { useGame } from "contexts/GameContext";
import { useState } from "react";
import { playCard } from "services/game";
import { ICard } from "types/game";
import { calculateTeamBonuses, canPlayerPlay, isCardCheating } from "utils/game_rules";
import Card from "./Card";

interface HandProps {
    playerIndex: number;
}

export default function Hand({ playerIndex }: HandProps) {
    const { id, table: { cheating }, game: {round: {trick, trump, turn, playerTurn, playerCards, playedCards, openingPlayer}} } = useGame()
    const [isLoading, setIsLoading] = useState(false);
    const cards = playerCards[playerIndex]

    const disabled = !canPlayerPlay(trick, playerIndex, playerTurn)

    const handlePlayCard = (index: number, card: ICard, isCheating: boolean, isDisabled: boolean) => {
        if (isDisabled) return

        const [team1Bonus, team2Bonus, startingPlayer] = calculateTeamBonuses(card, playerCards[playerTurn], playedCards, trick, turn, playerTurn, openingPlayer, trump) 
        const team1Cheated = isCheating && (playerIndex === 0 || playerIndex === 2);
        const team2Cheated = isCheating && (playerIndex === 1 || playerIndex === 3);

        setIsLoading(true);
        playCard(id, card, trick, turn, playerTurn, team1Bonus, team2Bonus, team1Cheated, team2Cheated, startingPlayer)
            .catch(() => setIsLoading(false))
    }

    return (
        <div className="absolute flex justify-center -bottom-20 w-full">
            {cards.map((card, index) => {
                const isCheating = disabled || isCardCheating(card, cards, playedCards, trump, turn, playerTurn)

                return (
                    <Card 
                        key={index}
                        index={index}
                        card={card}
                        isCheating={isCheating}
                        isDisabled={isLoading || disabled || (!cheating && isCheating)}
                        onPlay={handlePlayCard}
                    />
                )
            })}
        </div>
    )
}