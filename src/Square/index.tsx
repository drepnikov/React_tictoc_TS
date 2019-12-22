import React from "react";

interface ISquareProps {
  value: IValue;
  onClick: () => void;
}

export type IValue = null | "X" | "O";

export const Square = (props: ISquareProps) => {
  return (
    <button onClick={props.onClick} className="square">
      {props.value}
    </button>
  );
};
