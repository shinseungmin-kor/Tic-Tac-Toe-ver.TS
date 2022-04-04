import React from 'react';
import Button from './Button';
import './Board.css'

const Board = ({ square, handleClick }: any) => {

    const renderSquare = (n: number) => {
        return (
            <>
                <Button
                    vlaue={square[n]}
                    onCick={() => handleClick(n)}
                />
            </>
        )
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
}

export default Board;