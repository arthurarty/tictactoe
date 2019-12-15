import React from 'react';
import './App.css';
import calculateWinner from './utils/calculateWinner';
import getLocation from './utils/getLocation';
import Board from './components/board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          positions: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick = i => {
    const stepNumber = this.state.stepNumber;
    const history = this.state.history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    let squares = [...current.squares];
    let positions = [...current.positions];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    positions[stepNumber] = getLocation(i);
    this.setState({
      history: history.concat([{
        squares: squares,
        positions: positions,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2 ) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const stepNumber = this.state.stepNumber;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const positions = current.positions;

    const moves = history.map((step, move) => {
      const position = positions[move -1];
      let desc = 'Go to game start';
      if (position !== undefined && position !== null) {
        desc = `Go to move # ${move} Row: ${position.row} Col: ${position.col}`;
      }
      return (
        <li key={move.toString()}>
          <button onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      )
    })
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <h2>Current step {stepNumber} </h2>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
