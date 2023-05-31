import { Squares, WinningSquares, Symbol } from "./types";

export const checkWinner = (squares: Squares, rows: number) => {
  let winnerSymbol: Symbol | null = null;
  let winningSquares: WinningSquares = null;

  squares.forEach((square, index) => {
    if (winnerSymbol && winningSquares) {
      return { winnerSymbol, winningSquares };
    }

    if (square) {
      // Horizontal winning control
      if (
        square === squares[index + 1] &&
        square === squares[index + 2] &&
        square === squares[index + 3] &&
        square === squares[index + 4]
      ) {
        winnerSymbol = square;
        winningSquares = [index, index + 1, index + 2, index + 3, index + 4];
      }
      // Vertical winning control
      else if (
        square === squares[index + rows] &&
        square === squares[index + rows * 2] &&
        square === squares[index + rows * 3] &&
        square === squares[index + rows * 4]
      ) {
        winnerSymbol = square;
        winningSquares = [
          index,
          index + rows,
          index + rows * 2,
          index + rows * 3,
          index + rows * 4,
        ];
      }
      // Cross winning control toward right
      else if (
        square === squares[index + rows + 1] &&
        square === squares[index + (rows + 1) * 2] &&
        square === squares[index + (rows + 1) * 3] &&
        square === squares[index + (rows + 1) * 4]
      ) {
        winnerSymbol = square;
        winningSquares = [
          index,
          index + rows + 1,
          index + (rows + 1) * 2,
          index + (rows + 1) * 3,
          index + (rows + 1) * 4,
        ];
      }
      // Cross winning control toward left
      else if (
        square === squares[index + rows - 1] &&
        square === squares[index + (rows - 1) * 2] &&
        square === squares[index + (rows - 1) * 3] &&
        square === squares[index + (rows - 1) * 4]
      ) {
        winnerSymbol = square;
        winningSquares = [
          index,
          index + rows - 1,
          index + (rows - 1) * 2,
          index + (rows - 1) * 3,
          index + (rows - 1) * 4,
        ];
      }
    }
  });

  return { winnerSymbol, winningSquares };
};
