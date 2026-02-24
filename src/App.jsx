import { useState } from 'react';
import './App.css'

const Square = ({ value, onSquareClick }) => {
  return (
    <button
      className='square'
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
};

const calculateWinner = (grid) => {
  const n = grid.length;
  for (let i = 0; i < n; i++) {
    if (grid[i][0] && grid[i].every(cell => cell === grid[i][0])) {
      return grid[i][0];
    }
    if (grid[0][i] && grid.every(row => row[i] === grid[0][i])) {
      return grid[0][i];
    }
  }
  if (grid[0][0] && grid.every((row, i) => row[i] === grid[0][0])) {
    return grid[0][0];
  }
  if (grid[0][n - 1] && grid.every((row, i) => row[n - 1 - i] === grid[0][n - 1])) {
    return grid[0][n - 1];
  }
  return null;
};

function App() {
  const [squares, setSquares] = useState(Array(3).fill(Array(3).fill(null)));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (x, y) => {
    if (squares[x][y] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.map(row => row.slice());
    if (xIsNext) {
      nextSquares[x][y] = 'X';
    } else {
      nextSquares[x][y] = 'O';
    }
    setXIsNext(prev => !prev);
    setSquares(nextSquares);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game-container">
      <div className="status">{status}</div>
      <div className='board-row'>
        <Square value={squares[0][0]} onSquareClick={() => handleClick(0, 0)} />
        <Square value={squares[0][1]} onSquareClick={() => handleClick(0, 1)} />
        <Square value={squares[0][2]} onSquareClick={() => handleClick(0, 2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[1][0]} onSquareClick={() => handleClick(1, 0)} />
        <Square value={squares[1][1]} onSquareClick={() => handleClick(1, 1)} />
        <Square value={squares[1][2]} onSquareClick={() => handleClick(1, 2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[2][0]} onSquareClick={() => handleClick(2, 0)} />
        <Square value={squares[2][1]} onSquareClick={() => handleClick(2, 1)} />
        <Square value={squares[2][2]} onSquareClick={() => handleClick(2, 2)} />
      </div>
    </div>
  )
}

export default App
