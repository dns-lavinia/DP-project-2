export interface ITable {
    id: string;
    gameMode: number;
    name: string;
    joined: number;
    time: number;
    points: number;
    password: string;
    cheating: boolean;
    bigger: boolean
}

export interface IMessage {
    name: string;
    message: string;
    time: string;
    image?: string;
}

export interface IGame {
    gameId: string;
    team1Score: number;
    team2Score: number;
    joined: number;
    players: IPlayer[]
    round: IGameRound;
}

export interface IPlayer {
    id: string;
    name: string;
    photo: string;
}

export interface ICard {
    suit: string;
    value: number;
}

export interface IGameRound{
    turn: number;
    playerTurn: number;
    playerCards: ICard[][];
    auction: {
        playerAuction: number[];
        value: number;
    }
    trumpCard: string;
    team1Points: number;
    team2Points: number;
    team1Cheated: boolean;
    team2Cheated: boolean;
}