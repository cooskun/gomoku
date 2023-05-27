import {
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  SetOptions,
  addDoc,
} from "firebase/firestore";
import { database } from "./firebase";
import { SQUARES_IN_BOARD } from "./constants";
import { GameData, ReadGameData, Player } from "./types";

const initialData = {
  turn: "host",
  winner: null,
  winningSquares: null,
  squares: Array(SQUARES_IN_BOARD).fill(null),
};

const initialScoreData = {
  score: {
    host: 0,
    guest: 0,
  },
};

export const createNewGame = async (playerId: string): Promise<string> => {
  const gameRef = await addDoc(collection(database, "games"), {
    ...initialData,
    ...initialScoreData,
    players: {
      host: { id: playerId, symbol: "X" } as Player,
    },
  });

  return gameRef.id;
};

export const readGameData = async (gameId: string): Promise<ReadGameData> => {
  const gameRef = doc(database, "games", gameId);
  const gameSnap = await getDoc(gameRef);
  const isLoaded = gameSnap.exists();

  return { isLoaded, data: gameSnap.data() as GameData };
};

export const updateGameData = (
  gameId: string,
  {
    squares,
    winner = initialData.winner,
    winningSquares = initialData.winningSquares,
    turn,
    score,
  }: GameData
): Promise<void> => {
  return updateDoc(doc(database, "games", gameId), {
    squares,
    turn,
    winner,
    winningSquares,
    score,
  });
};

export const reloadGameData = (gameId: string) => {
  const options: SetOptions = { merge: true };
  return setDoc(doc(database, "games", gameId), initialData, options);
};

export const addGuestPlayerToGame = (gameId: string, playerId: string) => {
  const player: Player = {
    id: playerId,
    symbol: "O",
  };

  const data = {
    players: {
      guest: player,
    },
  };

  const options: SetOptions = { merge: true };

  return setDoc(doc(database, "games", gameId), data, options);
};

export const onGameSnapshot = (
  gameId: string,
  callback: (data: any) => void
) => {
  return onSnapshot(doc(database, "games", gameId), (snapshot) =>
    callback(snapshot.data())
  );
};
