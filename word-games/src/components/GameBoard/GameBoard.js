import React, { useState, useEffect } from 'react';
import WordTile from '../WordTile/WordTile';
import './GameBoard.css';

function GameBoard() {
  const wordPairs = [
    ['log', 'dog'],
    ['cap', 'map'],
    ['hat', 'bat'],
    ['pot', 'dot'],
    ['rug', 'bug'],
    ['fox', 'box'],
    // add more pairs till you have 12 if desired
  ];
  const flattenedWords = wordPairs.flat();

  const [shuffledWords, setShuffledWords] = useState([]);
  useEffect(() => {
    setShuffledWords(flattenedWords.sort(() => 0.5 - Math.random()));
}, [flattenedWords]);


  const [selectedTiles, setSelectedTiles] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [points, setPoints] = useState(0);

  const handleTileClick = (index, word) => {
    if (selectedTiles.length === 2) return;

    setSelectedTiles([...selectedTiles, { index, word }]);

    if (selectedTiles.length === 1) {
      const previousWord = selectedTiles[0].word;
      if (previousWord === word) {
        if (selectedTiles[0].index !== index) {
          setMatchedPairs([...matchedPairs, word]);
          setSelectedTiles([]);
          setPoints(points + 10); // award 10 points for a match
        }
      } else {
        setTimeout(() => {
          setSelectedTiles([]);
        }, 1000);
        setPoints(points - 5); // deduct 5 points for a mismatch
      }
    }
  };

  const restartGame = () => {
    setShuffledWords(flattenedWords.sort(() => 0.5 - Math.random()));
    setSelectedTiles([]);
    setMatchedPairs([]);
    setPoints(0);
  };

  useEffect(() => {
    if (matchedPairs.length === wordPairs.length) {
      alert(`Game complete! Your score is: ${points}`);
    }
  }, [matchedPairs, points, wordPairs.length]);
  

  return (
    <div className="game-board">
      <div>Score: {points}</div>
      {shuffledWords.map((word, index) => (
        <WordTile 
          key={index} 
          word={word} 
          isRevealed={selectedTiles.some(t => t.index === index) || matchedPairs.includes(word)}
          onClick={() => handleTileClick(index, word)}
        />
      ))}
      <button onClick={restartGame}>Restart Game</button>
    </div>
  );
}

export default GameBoard;
