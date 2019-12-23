import React from "react";

import { IValue, Square } from "../Square";

interface IBoardProps {
  squares: IValue[];

  onClick(i: number): void;
}

export class Board extends React.Component<IBoardProps> {
  renderSquare(i: number) {
    return <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  calculatePosition(row: number) {
    return row * 3;
  }

  createBoard() {
    const board = [];

    for (let position = 0; position < 3; position++) {
      const row = [];

      const cellPosition = this.calculatePosition(position);

      for (let i = cellPosition; i < cellPosition + 3; i++) {
        row.push(this.renderSquare(i));
      }

      board.push(
        <div key={position} className="board-row">
          {row}
        </div>
      );
    }

    return board;
  }

  render() {
    return <div>{this.createBoard()}</div>;
  }
}
