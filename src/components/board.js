import React from 'react';
import Square from './square'

class Board extends React.Component {
  renderSquare(i, r, c) {
    return (
      <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i, r, c)} />
    );
  }

  render() {
    let num = 0;
    let board = [];
    for (let r = 0; r < this.props.rows; r++) {
      let row = [];
      for (let c = 0; c < this.props.cols; c++) {
        row.push(this.renderSquare(num, r, c))
        num++;
      }
      board.push(<div key={r} className="board-row">{ row }</div>)
    }
    return board;
  }
}

export default Board