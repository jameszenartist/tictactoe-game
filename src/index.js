import React from "react";
import ReactDOM from "react-dom";
import Board from "./Board";
import CalculateWinner from "./CalculateWinner";
import "./index.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (CalculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  toStart() {
    this.setState({
      stepNumber: 0,
    });
  }

  moveBackOne() {
    this.setState({
      stepNumber: this.state.stepNumber - 1,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = CalculateWinner(current.squares);

    let status;

    // if (winner) {
    //   status = "Winner: " + winner;
    // } else {
    //   status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    // }

    if (winner) {
      status = "Winner: " + winner;
    } else if (history.length === 9) {
      status = "It's a tie!!";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <>
        <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
        <div className="game-info">
          <h2>{status}</h2>
          {this.state.stepNumber > 0 && (
            <>
              <button onClick={() => this.toStart()}>Start Over</button>
              <button
                key={this.state.stepNumber}
                onClick={() => this.moveBackOne()}
              >
                Go Back
              </button>
            </>
          )}
        </div>
      </>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
