import { IGameRound } from "types/game";

export function AddPointsToRound(gameRound: IGameRound){
    let roundPoints: number= 0;

    for(var i in gameRound.dealtCards){     // Calculate the points accumulated by the hand
        roundPoints+= gameRound.dealtCards[i].value;
    }

    if( gameRound.winnerPlayer == "player1" || gameRound.winnerPlayer == "player3" )  // Add points to team 1
        gameRound.team1Score+= roundPoints;
    else    // Add points to team 2
        gameRound.team2Score+= roundPoints;

}