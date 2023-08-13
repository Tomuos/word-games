// src/components/GameBoard/GameBoard.js

import React, { useState, useEffect } from 'react';
import WordTile from '../WordTile/WordTile';
import ScoreDisplay from '../ScoreDisplay/ScoreDisplay';
import ResetButton from '../ResetButton/ResetButton';
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
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [points, setPoints] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);

  useEffect(() => {
    setShuffledWords(flattenedWords.sort(() => 0.5 - Math.random()));
  }, [flattenedWords]);

  const handleTileClick = (index, word) => {
    if (isEvaluating || selectedTiles.length === 2) return;
  
    const tileAlreadySelected = selectedTiles.find(t => t.index === index);
  
    if (!tileAlreadySelected) {
      const newSelectedTiles = [...selectedTiles, { index, word }];
      setSelectedTiles(newSelectedTiles);
  
      if (newSelectedTiles.length === 2) {
        const [firstTile, secondTile] = newSelectedTiles;
        if (firstTile.word === secondTile.word) {
          setMatchedPairs([...matchedPairs, word]);
          setPoints(points + 10);
          setSelectedTiles([]); // Clear selected tiles
        } else {
          setIsEvaluating(true);
          setTimeout(() => {
            setSelectedTiles([]); // Clear selected tiles
            setIsEvaluating(false); // Reset evaluation state
          }, 1000);
          setPoints(points - 5);
        }
      }
    }
  };
  

  const restartGame = () => {
    setShuffledWords(flattenedWords.sort(() => 0.5 - Math.random()));
    setSelectedTiles([]);
    setMatchedPairs([]);
    setPoints(0);
    setIsEvaluating(false);
  };

  useEffect(() => {
    if (matchedPairs.length === wordPairs.length) {
      alert(`Game complete! Your score is: ${points}`);
    }
  }, [matchedPairs, points, wordPairs.length]);

  return (
    <div>
      <ScoreDisplay score={points} />
      <div className="game-board">
        {shuffledWords.map((word, index) => (
          <WordTile 
            key={index} 
            word={word} 
            isRevealed={selectedTiles.some(t => t.index === index) || matchedPairs.includes(word)}
            onClick={() => handleTileClick(index, word)}
          />
        ))}
      </div>
      <ResetButton onClick={restartGame} />
    </div>
  );
}

export default GameBoard;
