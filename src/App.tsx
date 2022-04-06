import React, { useState } from 'react';
import Board from './Board';
import './App.css';

interface historyType {
    squares: string[];
};

// 타입스트립트에 타입을 굳이 넣지 않는다고 해도, 타입스크립트 자체가 알아서 추론하기때문에 돌아가는데 문제는 없다.
const App = () => {
  const [history, setHistory] = useState <historyType[]>([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState<Boolean>(true);

  const handleClick = (n: number): void => {
    const newHistory: historyType[] = [...history];                  // 깊은복사: 전개연산자를 이용한다.
    // const newHistory = history.slice(0, stepNumber + 1);          // 얕은복사: slice() 를 이용한다.
    const current: historyType = newHistory[newHistory.length - 1];
    const squares: string[] = current.squares.slice();
    
    if(calculateWinner(squares) || squares[n]) return;
    squares[n] = xIsNext ? "X" : "O" 

    setHistory(newHistory.concat([{squares}]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext)
    // console.log(current.squares)
  };

  const jumpTo = (step: number): void => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  };

  const current: historyType = history[stepNumber];
  const winner: string | null = calculateWinner(current.squares);

  const moves: JSX.Element[] = history.map((step, move: number) => {
    const desc: string = move ? 'Go to move # ' + move : 'Go to game start';

    return (
      <>
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
      </>
    )
  });

  let status: string;

  if(winner) {
    status = 'Winner is: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
          <div className='App'>
          <h2>Tic - Tac - Toe</h2>
          <div className='status'>{status}</div>
            <Board 
              square={current.squares}
              handleClick={handleClick}
            />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
            {/* <button onClick={setState}>TimeWarp</button> */}
        </>
  );
};

const calculateWinner = (squares: string[]): string | null => {      // 승자를 정하는 함수.
  const lines: number[][] = [                           // 승리가 정해지는 경우를 가지고 있는 배열
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {  // line 배열을 순환하는 반복문을 만든다
      const [a, b, c]: number[] = lines[i];           // line 의 인덱스 배열을 임의의 배열로 지정하고 조건을 부여한다.
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {  
          return squares[a];
      }
  }
  return null;
};

export default App;
