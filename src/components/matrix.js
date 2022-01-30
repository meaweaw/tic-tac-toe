import React from 'react';
import Game from './game'
import '../index.css';

class Matrix extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: '',
      start: false
    }
  }

  handleKeyPress = (e) => {
    if (e.target.value === '') return
    if (e.key === 'Enter') {
      this.setState({
        matrix:e.target.value,
        start: true
      });
    }
  }

  newGame = () => {
    this.setState({
      start: false
    });
  }

  render() {
    if (this.state.start) {
      return <Game matrix={this.state.matrix} newGame={this.newGame} />
    } else {
      return (
        <>
          <h4 className="mt-3 text-center">Enter a number and press Enter.</h4>
          <div className="row mt-3 mb-3">
            <label className="col-sm-4 col-form-label">Row x Col : </label>
            <div className="col-sm-8">
              <input type="number" className="form-control form-control-sm" onKeyPress={this.handleKeyPress} autoFocus />
            </div>
          </div>
        </>
      )
    }
  }
}

export default Matrix