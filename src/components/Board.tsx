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
import { GameData, PlayersData, SquareValue } from "@/utils/types";
import { Button, Square, Cursor, Viewport, Waterfall } from "./index";
import cx from "classnames";
import { motion, AnimatePresence, useWillChange } from "framer-motion";

interface Props {
  data: GameData & PlayersData;
  gameId: string;
  playerId: string;
}

const boardVariants = {
  enter: { scale: 0.85 },
  exit: { scale: 1 },
};

const buttonVariants = {
  initial: { opacity: 0 },
  exit: { opacity: 0 },
  enter: { opacity: 1 },
};

const boardClasses = cx(
  "mx-auto",
  "inline-grid grid-cols-board",
  "transition-all duration-200 ease-in-out origin-top"
);

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
    playerSymbol,
  } = useGameState({ data, gameId, playerId });
  const willChange = useWillChange();

  const squareHandler = async (index: number, value: SquareValue) => {
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

  useEffect(() => {
    if (!isGameFull && data.players.host.id !== playerId) {
      addGuestPlayerToGame(gameId, playerId);
    }
  }, [isGameFull, data.players, gameId, playerId]);

  if (isGameFull) {
    return (
      <Viewport>
        <p className="text-4xl">This session is full!</p>
      </Viewport>
    );
  }

  return (
    <Viewport shouldHideCursor>
      <Waterfall className="absolute top-0">
        <span className="relative right-40">X</span>
        <span className="relative left-56">O</span>
      </Waterfall>
      <h1 className="text-center text-rose-900 text-7xl">
        {score?.host} - {score?.guest}
      </h1>
      <p className="mb-5 text-center text-7xl text-rose-900">
        {cx({
          "You won": winner && areYouWinner,
          "You lost": winner && !areYouWinner,
          "Your Turn": !winner && isYourTurn,
          "Opponent's Turn": !winner && !isYourTurn,
        })}
      </p>
      <motion.section
        variants={boardVariants}
        initial="exit"
        animate={winner ? "enter" : "exit"}
        className={boardClasses}
        style={{ willChange }}
      >
        {squares?.map((value: SquareValue, index: number) => {
          return (
            <Square
              key={index}
              value={value}
              index={index}
              onClick={() => squareHandler(index, value)}
              disabled={Boolean(winner) || !isYourTurn}
              isWinningSquare={Boolean(winningSquares?.includes(index))}
            />
          );
        })}
      </motion.section>
      <AnimatePresence>
        {winner && (
          <motion.section
            initial={buttonVariants.initial}
            animate={buttonVariants.enter}
            exit={buttonVariants.exit}
            className="absolute bottom-8 text-center"
            style={{ willChange }}
          >
            <Button
              className="rounded-xl cursor-none"
              onClick={() => reloadGameData(gameId)}
            >
              Play Again
            </Button>
          </motion.section>
        )}
      </AnimatePresence>
      <Cursor value={playerSymbol} />
    </Viewport>
  );
};

export default Board;
