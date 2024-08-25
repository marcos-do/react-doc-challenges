import React from "react";
import Square from "./Square";

interface BoardProps {
  xIsNext: boolean;
  squares: string[];
  onPlay: (squares: string[]) => void;
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Board: React.FC<BoardProps> = ({ xIsNext, squares, onPlay }) => {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const boardSize = 3;

  const boardRows = Array(boardSize).fill(null);
  const squaresPerRow = Array(boardSize).fill(null);

  return (
    <>
      <div className="status">{status}</div>
      {boardRows.map((_, i) => {
        return (
          <div key={i} className="board-row">
            {squaresPerRow.map((_, k) => {
              return (
                <Square
                  value={squares[i * boardSize + k]}
                  onSquareClick={() => handleClick(i * boardSize + k)}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default Board;
