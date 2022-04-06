import React from 'react';
import Button from './Button';
import './Board.css';

interface IBase {
  square: any;
}

interface IProps extends IBase {
  handleClick: (n: number) => void;
}

const Board = ({ square, handleClick }: IProps) => {
  const renderSquare = (n: number) => {
    return (
      <>
        <Button value={square[n]} onClick={() => handleClick(n)} />
      </>
    );
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
