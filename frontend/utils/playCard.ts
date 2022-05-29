import { ICard, IGameRound } from "types/game";

export function PlayCard(gameRound: IGameRound, chosenCard: ICard){
    if( gameRound.hand.firstPlayer == gameRound.hand.currentPlayer ){  // first player
        if(chosenCard.value == 3 || chosenCard.value == 4 ){    // Anuntz
            gameRound.team1Score+= check34(gameRound.deck.player1, gameRound.tromf, chosenCard);
        }else if ( gameRound.hand.currentPlayer == 'player2' ){
            gameRound.team2Score+= check34(gameRound.deck.player2, gameRound.tromf, chosenCard);
        }else if ( gameRound.hand.currentPlayer == 'player3' ){
            gameRound.team1Score+= check34(gameRound.deck.player3, gameRound.tromf, chosenCard);
        }else if ( gameRound.hand.currentPlayer == 'player4' ){
            gameRound.team2Score+= check34(gameRound.deck.player4, gameRound.tromf, chosenCard);
        }
        return true;
    }
    
    if( gameRound.gameRules.cheating == false ){    //Cheating NOT allowed
        if( gameRound.hand.currentPlayer == 'player1' ){
            if( noColorCardInHand(gameRound.deck.player1, gameRound.tromf, gameRound.hand.dealtCards[0], chosenCard) == false )
                return false;
            if( gameRound.gameRules.bigger == true ){    // Iber
                if( iber(gameRound.hand.dealtCards, chosenCard, gameRound.tromf) == false )
                    return false;
            }
        }else if( gameRound.hand.currentPlayer == 'player2' ){
            if( noColorCardInHand(gameRound.deck.player2, gameRound.tromf, gameRound.hand.dealtCards[0], chosenCard) == false )
                return false;
            if( gameRound.gameRules.bigger == true ){    // Iber
                if( iber(gameRound.hand.dealtCards, chosenCard, gameRound.tromf) == false )
                    return false;
            }
        }else if( gameRound.hand.currentPlayer == 'player3' ){
            if( noColorCardInHand(gameRound.deck.player3, gameRound.tromf, gameRound.hand.dealtCards[0], chosenCard) == false )
                return false;
            if( gameRound.gameRules.bigger == true ){    // Iber
                if( iber(gameRound.hand.dealtCards, chosenCard, gameRound.tromf) == false )
                    return false;
            }
        }else if( gameRound.hand.currentPlayer == 'player4' ){
            if( noColorCardInHand(gameRound.deck.player4, gameRound.tromf, gameRound.hand.dealtCards[0], chosenCard) == false )
                return false;
            if( gameRound.gameRules.bigger == true ){    // Iber
                if( iber(gameRound.hand.dealtCards, chosenCard, gameRound.tromf) == false )
                    return false;
            }
        }
    }else{  // Cheating ALLOWED
        if( gameRound.hand.currentPlayer == 'player1' ){
            if( noColorCardInHand(gameRound.deck.player1, gameRound.tromf, gameRound.hand.dealtCards[0], chosenCard) == false )
                gameRound.team1Cheated= true;
            if( gameRound.gameRules.bigger == true ){    // Iber
                if( iber(gameRound.hand.dealtCards, chosenCard, gameRound.tromf) == false )
                    gameRound.team1Cheated= true;
            }
        }else if( gameRound.hand.currentPlayer == 'player2' ){
            if( noColorCardInHand(gameRound.deck.player2, gameRound.tromf, gameRound.hand.dealtCards[0], chosenCard) == false )
                gameRound.team2Cheated= true;
            if( gameRound.gameRules.bigger == true ){    // Iber
                if( iber(gameRound.hand.dealtCards, chosenCard, gameRound.tromf) == false )
                    gameRound.team2Cheated= true;
            }
        }else if( gameRound.hand.currentPlayer == 'player3' ){
            if( noColorCardInHand(gameRound.deck.player3, gameRound.tromf, gameRound.hand.dealtCards[0], chosenCard) == false )
                gameRound.team1Cheated= true;
            if( gameRound.gameRules.bigger == true ){    // Iber
                if( iber(gameRound.hand.dealtCards, chosenCard, gameRound.tromf) == false )
                    gameRound.team1Cheated= true;
            }
        }else if( gameRound.hand.currentPlayer == 'player4' ){
            if( noColorCardInHand(gameRound.deck.player4, gameRound.tromf, gameRound.hand.dealtCards[0], chosenCard) == false )
                gameRound.team2Cheated= true;
            if( gameRound.gameRules.bigger == true ){    // Iber
                if( iber(gameRound.hand.dealtCards, chosenCard, gameRound.tromf) == false )
                    gameRound.team2Cheated= true;
            }
        }
    }
    
    return true;
}

function noColorCardInHand(hand : ICard[], tromf : string, firstCard : ICard, chosenCard : ICard){
    let color= false;
    let tr= false;

    for(let i in hand){     //checking if there is a card in hand with the requested color or tromf
        if( hand[i].suit == firstCard.suit )
            color= true;
        if( hand[i].suit == tromf )
            tr= true;
    }

    if( color == true ){    //if a color exists
        if( chosenCard.suit == firstCard.suit ) // if chosen card is a color
            return true;
    }else if( tr == true ){ //if color doesnt exist but there is tromf
        if( chosenCard.suit == tromf )  //if chosen card is tromf
            return true;
    }

    return false;
}

function iber(dealtCards : ICard[], chosenCard: ICard, tromf : string){
    let firstCardTromf= false;
    let tromfDown= false;
    let biggestValueDown= 0;

    if( dealtCards[0].suit == tromf )
        firstCardTromf= true;

    for(let i=0 ; i<dealtCards.length ; i++){
        if( i != 0 && dealtCards[i].suit == tromf )
            tromfDown= true;
        if( dealtCards[i].value > biggestValueDown )
            biggestValueDown= dealtCards[i].value;
    }

    if( firstCardTromf == false ){
        if( tromfDown == false )
            if(chosenCard.value < biggestValueDown)
                return false;
    }else{
        if(chosenCard.value < biggestValueDown )
            return false;
    }

    return true;
}

function check34(cards : ICard[], tromf : string, chosenCard : ICard){
    let c : ICard[] = []
    for(let i in cards){
        if( cards[i].value == 3 )
            c.push(cards[i])
        if( cards[i].value == 4 )
            c.push(cards[i])
    }

    for(let i in c ){
        if( c[i] != chosenCard ){
            if(c[i].suit == chosenCard.suit){
                if( chosenCard.suit == tromf )
                    return 40;
                return 20;
            }
        }
    }

    return 0;
}