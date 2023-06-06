"use client";

import { useEffect, FC } from "react";
import { checkWinner } from "@/utils/checkWinner";
import { useGameState } from "@/utils/hooks";
import { ROWS_IN_BOARD, HOST, GUEST } from "@/utils/constants";
import {
  reloadGameData,
  updateGameData,
  addGuestPlayerToGame,
} from "@/utils/service";
import { GameData, PlayersData, Square as SquareType } from "@/utils/types";
import { Button, Square } from "./index";

interface Props {
  data: GameData & PlayersData;
  gameId: string;
  playerId: string;
}

const Board: FC<Props> = ({ data, gameId, playerId }) => {
  const {
    squares,
    winningSquares,
    winner,
    areYouWinner,
    isGameFull,
    isYourTurn,
    turn,
    score,
    players,
  } = useGameState({ data, gameId, playerId });

  const squareHandler = async (index: number, value: SquareType) => {
    if (value) return;

    const _squares = [...squares];
    _squares[index] = players[turn].symbol;
    const { winnerSymbol, winningSquares } = checkWinner(
      _squares,
      ROWS_IN_BOARD
    );

    const _turn = winnerSymbol ? turn : turn === GUEST ? HOST : GUEST;
    const _winner = winnerSymbol ? turn : null;

    if (_winner) {
      const _score = {
        ...score,
        [_turn]: score[_turn] + 1,
      };

      await updateGameData(gameId, {
        squares: _squares,
        winner: _winner,
        winningSquares,
        score: _score,
        turn: _turn,
      });
    } else {
      await updateGameData(gameId, {
        squares: _squares,
        turn: _turn,
        score,
      });
    }
  };

  const reset = async () => {
    await reloadGameData(gameId);
  };

  useEffect(() => {
    if (!isGameFull && data.players.host.id !== playerId) {
      addGuestPlayerToGame(gameId, playerId);
    }
  }, [isGameFull, data.players, gameId, playerId]);

  if (isGameFull) {
    return <p className="text-4xl">This session is full!</p>;
  }

  return (
    <>
      <h1 className="text-center">
        Host {score?.host} - {score?.guest} Guest
      </h1>
      <p className="text-5xl mb-4 text-center">
        {winner
          ? `You ${areYouWinner ? "won" : "lost"}!`
          : isYourTurn
          ? "Your turn"
          : "Opponent's turn"}
      </p>
      <section className="inline-grid grid-cols-board mx-auto border border-indigo-400">
        {squares?.map((square: SquareType, index: number) => {
          return (
            <Square
              value={square}
              onClick={() => squareHandler(index, square)}
              disabled={Boolean(winner) || !isYourTurn}
              color={
                winningSquares?.includes(index)
                  ? "text-red-600"
                  : "text-blue-600"
              }
              key={index}
            />
          );
        })}
      </section>
      {winner && (
        <section className="text-center">
          <Button onClick={reset} className="mt-4 rounded-xl">
            Play Again
          </Button>
        </section>
      )}
    </>
  );
};

export default Board;
