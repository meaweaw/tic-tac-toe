import React from 'react';
import Board from './board'
import { Button } from '@material-ui/core';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: props.matrix,
      history: [{
        squares: Array(props.matrix * props.matrix).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      checkWinner: [...Array(parseInt(props.matrix))].map((row) => Array(parseInt(props.matrix)).fill(null)),
      isWinner: null,
    }
    // this.handleChange = this.handleChange.bind(this);
  }

  resetState = (state) => {
    this.setState({
      history: [{
        squares: Array(state.matrix * state.matrix).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      checkWinner: [...Array(parseInt(state.matrix))].map((row) => Array(parseInt(state.matrix)).fill(null)),
      isWinner: null,
    });
  }

  handleClick(i, r, c) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let isWinner = this.state.isWinner

    if (squares[i] || isWinner !== null) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    let setCheckWinner = this.state.checkWinner;
    setCheckWinner[r][c] = squares[i];
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      checkWinner: setCheckWinner
    });

    let checkWinner = this.calculateWinner(this.state.checkWinner, squares[i]);
    if (checkWinner) {
      this.setState({
        isWinner: squares[i]
      });
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  calculateWinner(squares, symbol) {
    let checkHorizontal = squares.some((moves) => moves.every((move) => move === symbol))
    if (checkHorizontal) {
      return checkHorizontal
    }

    let checkVertical = squares.map((_,index) => squares.map((row) => row[index]))
    checkVertical = checkVertical.some((moves) => moves.every((move) => move === symbol))
    if (checkVertical) {
      return checkVertical
    }

    let equalBasedDiagonal = [];
    for(let r = 0; r < squares.length; r++){
      for (let c = 0; c < squares.length; c++) {
        if (r === c) {
          equalBasedDiagonal.push(squares[r][c])
        }
      }
    }

    let sumBasedDiagonal = [];
    for(let r = 0; r < squares.length; r++){
      for (let c = 0; c < squares.length; c++) {
        if (r + c === squares.length -1 ) {
          sumBasedDiagonal.push(squares[r][c])
        }
      }
    }

    let checkDiagonal = [];
    checkDiagonal.push(equalBasedDiagonal, sumBasedDiagonal);
    checkDiagonal = checkDiagonal.some((moves) => moves.every((move) => move === symbol))
    if (checkDiagonal) {
      return checkDiagonal
    }

    return false;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.state.isWinner;

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <Button size="small" variant="text" onClick={() => this.jumpTo(move)}>{ desc }</Button>
        </li>
      );
    });

    let status;
    if (winner !== null) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <h2 style={{textAlign : 'center'}}>Tic Tac Toe</h2>
        <div className="game">
          <div className="game-board">
            <Board rows={this.state.matrix} cols={this.state.matrix} squares={current.squares} onClick={(i, r, c) => this.handleClick(i, r, c)} />
          </div>
          <div className="game-info">
            <div className="mb-2">{ status }</div>
            <Button size="small" variant="text" onClick={() => this.props.newGame()}>New Game</Button>
            <Button size="small" variant="text" onClick={() => this.resetState(this.state)}>Restart</Button>
            <ol>
              { moves }
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Game