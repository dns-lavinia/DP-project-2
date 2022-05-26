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

export interface IGameRoundCards{
    player1: ICard[];
    player2: ICard[];
    player3: ICard[];
    player4: ICard[];
}

export interface IGameRound{
    deck: IGameRoundCards;
    firstPlayer: string;
    currentPlayer: string;
    winnerPlayer: string;
    dealtCards: ICard[];
    tromf: string;
    roundNumber: number;
    team1Score: number;
    team2Score: number;
    team1Points: number;
    team2Points: number;
    pointsChosen: number;
    teamPoints: number;
    gameRules: IGame;
    team1Cheated: boolean;
    team2Cheated: boolean;
}