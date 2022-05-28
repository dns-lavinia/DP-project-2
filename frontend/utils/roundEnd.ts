import { IGameRound } from "types/game";

export function RoundEnd(gameround : IGameRound){
    if( gameround.teamPoints == 1 ){ // Team 1
        if( gameround.team1Score >= gameround.pointsChosen ) // If they have enough points we add them
            gameround.team1Points+= (gameround.pointsChosen/33);
        else    // otherwise we subtract them
            gameround.team1Points-= (gameround.pointsChosen/33);

        // Add points to the other team
        gameround.team2Points+= gameround.team2Score/33;
    }else{  // Team 2
        if( gameround.team2Score >= gameround.pointsChosen ) // If they have enough points we add them
            gameround.team2Points+= (gameround.pointsChosen/33);
        else  // otherwise we subtract them
            gameround.team2Points-= (gameround.pointsChosen/33);
        
        // Add points to the other team
        gameround.team1Points+= gameround.team1Score/33;
    }
}