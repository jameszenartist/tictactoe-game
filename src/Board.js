import React from "react";
import Square from "./Square";

export class Board extends React.Component {
  renderAllSquares() {
    let arr = [];
    for (let i = 0; i < 9; i++) {
      arr.push(
        <Square
          value={this.props.squares[i]}
          onClick={() => {
            this.props.onClick(i);
          }}
        />
      );
    }
    let container = [];
    for (let j = 0; j < 3; j++) {
      container.push(<div className="board-row">{arr.splice(0, 3)}</div>);
    }
    return <>{container}</>;
  }

  render() {
    return <div className="board">{this.renderAllSquares()}</div>;
  }
}

export default Board;
