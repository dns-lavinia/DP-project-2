export interface ITable {
    id: number;
    name: string;
    joined: number;
    time: number;
    points: number;
    password: boolean;
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