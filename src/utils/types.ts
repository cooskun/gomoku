export type Symbol = "X" | "O";
export type SquareValue = Symbol | null;
export type Squares = SquareValue[];
export type Sides = "host" | "guest";
export type Turn = Sides;
export type Winner = Sides | undefined | null;
export type WinningSquares = number[] | null;

export type Score = {
  host: number;
  guest: number;
};

export type Player = {
  id: string;
  symbol: Symbol;
};

export type Players = {
  host: Player;
  guest: Player;
};

export type PlayersData = {
  players: Players;
};

export type GameData = {
  squares: Squares;
  turn: Turn;
  score: Score;
  winner?: Winner;
  winningSquares?: WinningSquares;
};

export type ReadGameData = {
  isLoaded: boolean;
  data: GameData | undefined;
};

export type GameState = {
  data: GameData & PlayersData;
  gameId: string;
  playerId: string;
};

export type GameSnapshot = GameData & PlayersData;
