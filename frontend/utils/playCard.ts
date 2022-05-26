import { ICard, IGameRound } from "types/game";

export function PlayCard(gameRound: IGameRound, chosenCard: ICard){
    if( gameRound.firstPlayer == gameRound.currentPlayer )  // first player
        return true;
    
    if( gameRound.gameRules.cheating == false ){    //Cheating NOT allowed
        if( chosenCard.suit == gameRound.dealtCards[0].suit || chosenCard.suit == gameRound.tromf ){ //same color
            if( gameRound.gameRules.bigger == true ){ //BIGGER
                for( var c in gameRound.dealtCards ){
                    if( gameRound.dealtCards[c].value > chosenCard.value ) // If smaller value return false
                        return false;
                }
            }
        }
    }else{  // Cheating ALLOWED
        if( chosenCard.suit == gameRound.dealtCards[0].suit || chosenCard.suit == gameRound.tromf ){
            if( gameRound.gameRules.bigger == true ){
                for( var c in gameRound.dealtCards ){
                    if( gameRound.dealtCards[c].value > chosenCard.value )
                        if( gameRound.currentPlayer == "player1" || gameRound.currentPlayer == "player3" ) // mark team for cheating
                            gameRound.team1Cheated= true;
                        else
                            gameRound.team2Cheated= true;
                }
            }
        }else{
            if( gameRound.currentPlayer == "player1" || gameRound.currentPlayer == "player3" ) // mark team for cheating
                gameRound.team1Cheated= true;
            else
                gameRound.team2Cheated= true;
        }
    }
    
    return true;
}