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

  const [shuffledWords, setShuffledWords] = useState(flattenedWords.sort(() => 0.5 - Math.random()));
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [points, setPoints] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  
  

  const isRhymingPair = (word1, word2) => {
    return wordPairs.some(pair => (pair.includes(word1) && pair.includes(word2))) && word1 !== word2;
  }

  const handleTileClick = (index, word) => {
    if (isEvaluating || selectedTiles.length === 2 || matchedPairs.includes(word)) return;

    const tileAlreadySelected = selectedTiles.find(t => t.index === index);

    if (!tileAlreadySelected) {
      const newSelectedTiles = [...selectedTiles, { index, word }];
      setSelectedTiles(newSelectedTiles);

      if (newSelectedTiles.length === 2) {
        const [firstTile, secondTile] = newSelectedTiles;
        if (isRhymingPair(firstTile.word, secondTile.word)) {
          setMatchedPairs(prevPairs => [...prevPairs, firstTile.word, secondTile.word]);
          setPoints(points + 10);
          setSelectedTiles([]); // Clear selected tiles
        } else {
          setIsEvaluating(true);
          setTimeout(() => {
            setSelectedTiles([]); // Clear selected tiles
            setIsEvaluating(false); // Reset evaluation state
          }, 2000);
          setPoints(points - 1);
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
    if (matchedPairs.length === wordPairs.length * 2) {
      setGameComplete(true);
    }
  }, [matchedPairs, points, wordPairs.length]);
  

  const getColorClass = (word) => {
    const pairIndex = wordPairs.findIndex(pair => pair.includes(word));
    return `rainbow-color-${pairIndex + 1}`;
  };

  return (
    <div>
      <ScoreDisplay score={points} />
      <div className="game-board">
        {shuffledWords.map((word, index) => (
          <WordTile 
            key={index} 
            word={word} 
            className={`${matchedPairs.includes(word) ? 'matched-tile' : ''} ${selectedTiles.some(t => t.index === index) || matchedPairs.includes(word) ? getColorClass(word) : ''}`}
            isRevealed={selectedTiles.some(t => t.index === index) || matchedPairs.includes(word)}
            onClick={() => handleTileClick(index, word)}
          />
        ))}
      </div>
      <ResetButton onClick={restartGame} />
      {gameComplete && <h2>Congratulations, you won!</h2>}
    </div>
  );
        }

export default GameBoard;
