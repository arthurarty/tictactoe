import React from 'react';
import './App.css';
import calculateWinner from './calculateWinner';
import Board from './components/board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {squares: Array(9).fill(null)},
      ],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick = i => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    let squares = [...current.squares];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
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

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move:
        'Go to game start';
      return (
        <li>
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
