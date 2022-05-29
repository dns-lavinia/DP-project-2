import { IGameRound } from "types/game";

export function HandEnd(gameRound: IGameRound){
    let handPoints: number= 0;

    for(var i in gameRound.hand.dealtCards){     // Calculate the points accumulated by the hand
        handPoints+= gameRound.hand.dealtCards[i].value;
    }

    if( gameRound.hand.winnerPlayer == "player1" || gameRound.hand.winnerPlayer == "player3" )  // Add points to team 1
        gameRound.team1Score+= handPoints;
    else    // Add points to team 2
        gameRound.team2Score+= handPoints;

}