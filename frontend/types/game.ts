export interface ITable {
    id: number;
    gameMode: number;
    name: string;
    joined: number;
    time: number;
    points: number;
    password: string;
    cheating: boolean;
    bigger: boolean
}

export interface IGame {
    id: number;
    size: number;
    joined: number;
    time: number;
    points: number;
    password: boolean;
    cheating: boolean;
    bigger: boolean
}

export interface ICard {
    suit: string;
    value: number;
}

export interface IMessage {
    name: string;
    message: string;
    time: string;
    image?: string;
}