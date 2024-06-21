import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const NumberOfBlock = 5;
  const [block, setBlocks] = useState(Array(5).fill(null));

  const [selectedBox, setSelectedBox] = useState(null);
  const [success, setSuccess] = useState();
  const [score, setScore] = useState(0);
  const [errorBox, setErrorBox] = useState();
  const [startGame, setStartGame] = useState(false);

  const handleStartGame = () => {
    setStartGame(true);
  };

  useEffect(() => {
    let timer;
    if (startGame) {
      timer = setInterval(() => {
        const rN = Math.floor(Math.random() * 5);
        setSelectedBox(rN);
        setErrorBox(null);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  });

  const handleBlockOnClick = (index) => {
    if (selectedBox === index) {
      setScore((prev) => prev + 1);
      const maxScroe = localStorage.getItem('blinkGameScore');
      if (maxScroe <= score) {
        localStorage.setItem('blinkGameScore', score);
      }
    } else {
      setErrorBox(index);
      setStartGame(false);
      alert(`Game Over , Your Final Score is ${score}`);
    }
  };
  return (
    <>
      <h2 style={{ color: 'black' }}>Blick Game </h2>
      <span>Max Score : </span>
      <span>{localStorage.getItem('blinkGameScore')} </span>

      <span>Score : </span>
      <span>{score} </span>
      <div className={`blockContainer`}>
        {block.map((b, index) => (
          <div
            onClick={() => handleBlockOnClick(index)}
            className={`block ${selectedBox == index ? 'green' : null} ${
              errorBox === index ? 'red' : 'null'
            }`}
          ></div>
        ))}
      </div>
      <button className="startBtn" onClick={handleStartGame}>
        {' '}
        Start Game
      </button>
      <button
        className="startBtn"
        onClick={() => {
          setStartGame(false);
          setSelectedBox(null);
          setScore(0);
        }}
      >
        {' '}
        End Game
      </button>
    </>
  );
}

export default App;
