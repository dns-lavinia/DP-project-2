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