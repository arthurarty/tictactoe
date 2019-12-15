import React from 'react';
import Square from './square';

class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square key={i}
          value={this.props.squares[i]}
          onClick={()=> this.props.onClick(i)}
        />
        );
    }
  
    render() {
      let board = [];
      let squareCount = 0;
      for(let i = 0; i < 3; i++){
          let row = [];
          for (let j = 0; j < 3; j++) {
            row.push(this.renderSquare(squareCount));
            squareCount += 1;
          }
          board.push(
            <div className="board-row" key={i.toString()}>
              {row}
            </div>
          );
      }
      return (
        <div>
          {board}
        </div>
      );
    }
  }
  
export default Board;