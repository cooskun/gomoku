import { useState, useEffect, useRef } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import { onGameSnapshot } from "./service";
import {
  GameState,
  WinningSquares,
  Turn,
  Players,
  Score,
  Squares,
  Winner,
  GameSnapshot,
} from "./types";
import { HOST_SYMBOL, GUEST_SYMBOL } from "./constants";

export const useAuth = () => {
  const [playerId, setPlayerId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();

    signInAnonymously(auth)
      .then((response) => setPlayerId(response.user.uid))
      .catch((error) => console.log(error));
  }, []);

  return playerId;
};

export const useGameState = ({ data, gameId, playerId }: GameState) => {
  const { players, squares, turn, score, winner, winningSquares } = data;

  const squaresRef = useRef(data.squares);

  /* X or O */
  const playerSymbol =
    playerId === players.host.id ? HOST_SYMBOL : GUEST_SYMBOL;

  /* Two players already joined */
  /* Make sure player who wants to join is not one of joined players */
  const isGameFull: boolean =
    Object.keys(players).length === 2 &&
    playerId !== players.host.id &&
    playerId !== players.guest.id;

  const [gameState, setGameState] = useState<{
    players: Players;
    squares: Squares;
    turn: Turn;
    score: Score;
    winner: Winner;
    winningSquares: WinningSquares | undefined;
    isYourTurn: boolean;
    areYouWinner: boolean;
  }>({
    players,
    squares,
    turn,
    score,
    winner,
    winningSquares,
    isYourTurn: playerId === players[turn]?.id,
    areYouWinner: winner ? playerId === players[winner]?.id : false,
  });

  onGameSnapshot(gameId, (snapshot: GameSnapshot) => {
    if (
      JSON.stringify(squaresRef.current) !== JSON.stringify(snapshot?.squares)
    ) {
      squaresRef.current = snapshot.squares;

      const { players, squares, turn, score, winner, winningSquares } =
        snapshot;

      setGameState({
        squares,
        winner,
        winningSquares,
        turn,
        players,
        score,
        isYourTurn: playerId === players[turn]?.id,
        areYouWinner: winner ? playerId === players[winner]?.id : false,
      });
    }
  });

  return {
    gameState: { ...gameState, isGameFull, playerSymbol },
  };
};
