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

export interface IUser {
    uid: string;
    name: string | null;
    photo: string | null;
}

export interface ICard {
    suit: string;
    value: number;
}

export interface IGame {
    gameId: string;
    team1Score: number;
    team2Score: number;
    joined: number;
    players: IUser[]
    round: IGameRound;
}

export interface IGameRound{
    trick: number;
    turn: number;
    playerTurn: number;
    openingPlayer: number;
    playerCards: ICard[][];
    playedCards: ICard[];
    auction: {
        bids: number[];
        value: number;
    }
    trump: string;
    team1Points: number;
    team2Points: number;
    team1Cheated: boolean;
    team2Cheated: boolean;
}