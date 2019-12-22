import React from "react";

import { Board } from "./Board";

import { IValue } from "./Square";

interface IAppState {
  history: IHistoryStep[];
  xIsNext: boolean;
  stepNumber: number;
}

interface IHistoryStep {
  squares: IValue[];
}

export class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      xIsNext: true,

      stepNumber: 0
    };
  }

  calculateWinner(squares: any[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const currentSquares = history[history.length - 1].squares;

    const squares = currentSquares.slice();

    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({ stepNumber: history.length, history: history.concat([{ squares }]), xIsNext: !this.state.xIsNext });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const { history } = this.state;

    const squares = history[this.state.stepNumber].squares;

    const winner = this.calculateWinner(squares);

    let status;

    if (winner) {
      status = "Выиграл " + winner;
    } else {
      status = "Следующий ход: " + (this.state.xIsNext ? "X" : "O");
    }

    const steps = this.state.history.map((_, move) => {
      const desc = move ? "Перейти к ходу #" + move : "К началу игры";

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            onClick={(i: number) => {
              this.handleClick(i);
            }}
            squares={squares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{steps}</ol>
        </div>
      </div>
    );
  }
}
