import React, { useState } from "react";
import Board from "./Board";
import "./styles.css";

const Game: React.FC = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [toggle, setToggle] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    let description;
    if (move === history.length - 1) {
      description = "You are at move #" + move;
      return <li key={move}>{description}</li>;
    }
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{toggle ? moves.reverse() : moves}</ol>
      </div>
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
        className="toggle"
      >
        Toggle moves
      </button>
    </div>
  );
};

export default Game;
