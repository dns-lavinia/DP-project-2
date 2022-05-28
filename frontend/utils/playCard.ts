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
        if( chosenCard.suit == gameRound.hand.dealtCards[0].suit || chosenCard.suit == gameRound.tromf ){ //same color
            if( gameRound.gameRules.bigger == true ){ //BIGGER
                for( var c in gameRound.hand.dealtCards ){
                    if( gameRound.hand.dealtCards[c].value > chosenCard.value ) // If smaller value return false
                        return false;
                }
            }
        }
    }else{  // Cheating ALLOWED
        if( chosenCard.suit == gameRound.hand.dealtCards[0].suit || chosenCard.suit == gameRound.tromf ){
            if( gameRound.gameRules.bigger == true ){
                for( var c in gameRound.hand.dealtCards ){
                    if( gameRound.hand.dealtCards[c].value > chosenCard.value )
                        if( gameRound.hand.currentPlayer == "player1" || gameRound.hand.currentPlayer == "player3" ) // mark team for cheating
                            gameRound.team1Cheated= true;
                        else
                            gameRound.team2Cheated= true;
                }
            }
        }else{
            if( gameRound.hand.currentPlayer == "player1" || gameRound.hand.currentPlayer == "player3" ) // mark team for cheating
                gameRound.team1Cheated= true;
            else
                gameRound.team2Cheated= true;
        }
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