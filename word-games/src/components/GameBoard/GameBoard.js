import React, { useState } from 'react';
import './GameBoard.css';
import Card from '../Card/Card';

const sounds = ['a', 'a', 'b', 'b', 'c', 'c']; // Replace these with your actual sounds

function GameBoard() {
  const [shuffledSounds, setShuffledSounds] = useState(shuffleSounds());

  function shuffleSounds() {
    return sounds.sort(() => 0.5 - Math.random());
  }

  function restartGame() {
    setShuffledSounds(shuffleSounds());
    // Add more logic to reset game state if necessary
  }

  return (
    <div>
      <div className="game-board">
        {shuffledSounds.map((sound, index) => (
          <Card key={index} sound={sound} />
        ))}
      </div>
      <button onClick={restartGame}>Restart Game</button>
    </div>
  );
}

export default GameBoard;
