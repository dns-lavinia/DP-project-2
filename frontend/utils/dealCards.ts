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
            player4: shuffledCard.slice(18,24)
        }
    
    
    console.log(result);
    return result;
}

function checkDeck(deck : Array<ICard>){
    let r1= 0, r2= 0, f1= 0, f2= 0, g1=0, g2= 0, d1=0, d2= 0, n=0;
    for(var i=0 ; i<4 ; i++ ){
        for(var j=0 ; j<6 ; j++ ){
            if(deck[i*6+j].suit == 'rosu'){
                if( i % 2 == 1 )    // team 1
                    r1+= 1;
                else                // team 2
                    r2+= 1;
            }
            if(deck[i*6+j].suit == 'frunza'){
                if( i % 2 == 1 )    // team 1
                    f1+= 1;
                else                // team 2
                    f2+= 1;
            }
            if(deck[i*6+j].suit == 'duba'){
                if( i % 2 == 1 )    // team 1
                    d1+= 1;
                else                // team 2
                    d2+= 1;
            }
            if(deck[i*6+j].suit == 'ghinda'){
                if( i % 2 == 1 )    // team 1
                    g1+= 1;
                else                // team 2
                    g2+= 1;
            }
            if(deck[i*6+j].value == 0)
                n++;
        }
        if( n == 4 )    // one player has 4 nines
            return false;
        n= 0;
    }

    console.log(r1, r2, f1, f2, g1, g2, d1, d2);

    if( r1 == 0 || r2 == 0 || f1 == 0 || f2 == 0 || g1 == 0 || g2 == 0 || d1 == 0 || d2 == 0 ) // one team has 0 card of one color
        return false;

    return true;
}