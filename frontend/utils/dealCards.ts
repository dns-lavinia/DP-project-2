import { ICard, IGameRoundCards } from "types/game";

export function DealCards(players: number){
    let cards= Array<ICard>();
    let color= ['rosu', 'frunza', 'duba', 'ghinda'];
    let numbers= [2, 3, 4, 0, 10, 11];

    for(var c in color){
        for(var n in numbers){
            let card : ICard= {
                suit: color[c],
                value: numbers[n]
            };

            cards.push(card);
        }
    }

    let shuffledCard= cards.sort(() => Math.random() - 0.5);

    while( checkDeck(shuffledCard) == false){
        shuffledCard= cards.sort(() => Math.random() - 0.5);
    }

    let result : IGameRoundCards={
        player1: shuffledCard.slice(0,6),
        player2: shuffledCard.slice(6,12),
        player3: shuffledCard.slice(12,18),
        player4: shuffledCard.slice(18,24),
    }
    
    console.log(result);
    return result;
}

function checkDeck(deck : Array<ICard>){
    let r= 0, f= 0, g=0, d=0, n=0;
    for(var i=0 ; i<4 ; i++ ){
        for(var j=0 ; j<6 ; j++ ){
            if(deck[i*6+j].suit == 'rosu')
                r++;
            if(deck[i*6+j].suit == 'frunza')
                f++;
            if(deck[i*6+j].suit == 'duba')
                d++;
            if(deck[i*6+j].suit == 'ghinda')
                g++;
            if(deck[i*6+j].value == 0)
                n++;
        }
        if( r == 0 || f == 0 || g == 0 || d == 0 || n == 4 )
            return false;
        r= 0;
        f= 0;
        g= 0;
        d= 0;
        n= 0;
    }

    return true;
}