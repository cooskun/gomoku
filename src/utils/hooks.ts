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
  const playerSymbol =
    playerId === data.players.host.id ? HOST_SYMBOL : GUEST_SYMBOL;
  const squaresRef = useRef(data.squares);
  const isGameFull: boolean =
    Object.keys(data?.players).length === 2 &&
    playerId !== data?.players.host.id &&
    playerId !== data?.players.guest.id;
  const [turn, setTurn] = useState<Turn>(data.turn);
  const [players, setPlayers] = useState<Players>(data.players);
  const [score, setScore] = useState<Score>(data.score);
  const [squares, setSquares] = useState<Squares>(data.squares);
  const [winner, setWinner] = useState<Winner>(data.winner);
  const [winningSquares, setWinningSquares] = useState<
    WinningSquares | undefined
  >(data.winningSquares);
  const [isYourTurn, setIsYourTurn] = useState<boolean>(
    playerId === data.players[turn]?.id
  );
  const [areYouWinner, setAreYouWinner] = useState<boolean>(
    winner ? playerId === data?.players[winner]?.id : false
  );

  onGameSnapshot(gameId, (snapshot: GameSnapshot) => {
    if (
      JSON.stringify(squaresRef.current) !== JSON.stringify(snapshot?.squares)
    ) {
      squaresRef.current = snapshot.squares;
      setSquares(snapshot.squares);
      setWinner(snapshot.winner);
      setWinningSquares(snapshot.winningSquares);
      setTurn(snapshot.turn);
      setPlayers(snapshot.players);
      setIsYourTurn(playerId === snapshot.players[snapshot.turn]?.id);
      setAreYouWinner(
        snapshot.winner
          ? playerId === snapshot.players[snapshot.winner]?.id
          : false
      );
      setScore(snapshot.score);
    }
  });

  return {
    squares,
    turn,
    isYourTurn,
    winner,
    areYouWinner,
    winningSquares,
    isGameFull,
    players,
    score,
    playerSymbol,
  };
};
