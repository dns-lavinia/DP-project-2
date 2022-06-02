import { ICard } from "types/game";

export function shuffleCards(){
    const suits = ['R', 'V', 'D', 'G'];
    const values = [0, 2, 3, 4, 10, 11];

    // cartesian product
    let deck = []
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }   

    let shuffledDeck, p1Cards, p2Cards, p3Cards, p4Cards;
    do {
        shuffledDeck = deck.sort(() => Math.random() - 0.5);

        p1Cards = shuffledDeck.slice(0, 6);
        p2Cards = shuffledDeck.slice(6, 12);
        p3Cards = shuffledDeck.slice(12, 18);
        p4Cards = shuffledDeck.slice(18, 24);
    } while ( !check(p1Cards, p2Cards, p3Cards, p4Cards) );

    return [p1Cards, p2Cards, p3Cards, p4Cards]
}

function check(p1c: ICard[], p2c: ICard[], p3c: ICard[], p4c: ICard[]) {
    return checkNines(p1c) && checkNines(p2c) && checkNines(p3c) && checkNines(p4c);
}

function checkNines(deck: ICard[]){
    let nines = 0;
    for (let card of deck) {
        if (card.value === 0) {
            nines++;
        }
    }

    return nines !== 4;
}

function hasSuit(playerCards: ICard[], firstCard: ICard) {
    return playerCards.some(card => card.suit === firstCard.suit);
}

function hasTrump(playerCards: ICard[], trump: string) {
    return playerCards.some(card => card.suit === trump);
}

export function isCardCheating(card: ICard, playerCards: ICard[], playedCards: ICard[], trump: string, turn: number, playerTurn: number) {
    if ( turn === 0 ) return false;

    if ( hasSuit(playerCards, playedCards[0])) {
        return card.suit !== playedCards[0].suit;
    }

    if ( hasTrump(playerCards, trump)) {
        return card.suit !== trump;
    }

    return false;
}

export function canPlayerPlay(trick: number, playerIndex: number, playerTurn: number) {
    return trick !== 0 && playerIndex === playerTurn;
}

function findWinningCardIndex(board: ICard[], trump: string) {
    let winningCardIndex = 0;

    for (let i = 1; i < board.length; i++) {
        const card = board[i];
        const winningCard = board[winningCardIndex];

        if (card.suit === trump) {
            winningCardIndex = i;
        }
        else if (card.suit === winningCard.suit && card.value > winningCard.value) {
            winningCardIndex = i;
        }
    }

    return winningCardIndex;
}

function findPair(card: ICard, playerCards: ICard[]) {
    const pairValue = card.value === 3 ? 4 : 3;
    return playerCards.find(c => c.suit === card.suit && c.value === pairValue);
}

export function calculateTeamBonuses(card: ICard, playerCards: ICard[], playedCards: ICard[], trick: number, turn: number, playerTurn: number, openingPlayer: number, trump: string) {
    // end of trick
    if ( turn === 3 ) {
        const newPlayedCards = [...playedCards, card];
        const totalPoints = newPlayedCards.reduce((acc, curr) => acc + curr.value, 0);
        const winningCardIndex = findWinningCardIndex(newPlayedCards, trump);

        const winningPlayerIndex = (4 + winningCardIndex - openingPlayer) % 4;

        const team1Bonus = (winningPlayerIndex === 0 || winningPlayerIndex === 2) ? totalPoints : 0;
        const team2Bonus = (winningPlayerIndex === 1 || winningPlayerIndex === 3) ? totalPoints : 0;

        return [team1Bonus, team2Bonus, winningPlayerIndex];
    }

    if (card.value != 3 && card.value != 4) {
        return [0, 0, 0];
    }

    if ( findPair(card, playerCards) ) {
        const isTrumpCard = card.suit === trump;
        const team1Bonus = (playerTurn === 0 || playerTurn === 2) ? (isTrumpCard ? 40 : 20) : 0;
        const team2Bonus = (playerTurn === 1 || playerTurn === 3) ? (isTrumpCard ? 40 : 20) : 0;
        
        return [team1Bonus, team2Bonus, 0];
    }

    return [0, 0, 0]
}