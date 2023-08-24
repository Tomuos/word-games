import React, { useState, useRef, useEffect, useCallback } from "react";

import "./App.css";
//import GameBoard from "../GameBoard/GameBoard";
import LetterPool from "../LetterPool/LetterPool";
import ControlPanel from "../ControlPanel/ControlPanel";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BoardSpot from "../BoardSpot/BoardSpot";
//import appleImage from "../../assets/images/fruit/apple.png";
import appleAudio from "../../assets/audio/Apple.m4a";

import "font-awesome/css/font-awesome.min.css";

function App() {
  const words = [
    "apple",
    "banana",
    "blackberry",
    "blueberry",
    "cherry",
    "lemon",
    "mango",
    "orange",
    "pineapple",
    "plum",
    "raspberry",
    "strawberry",
  ];
  const [currentWord, setCurrentWord] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(new Audio(appleAudio));
  const [correctCount, setCorrectCount] = useState(0);


  const incrementCorrectCount = () => {
    if (isWordComplete()) {
      setCorrectCount(correctCount + 1);
    }
  };
  
  

  const isWordComplete = () => {
    return placedLetters.every((letter, index) => letter === currentWord[index]);
  }
  
  const [placedLetters, setPlacedLetters] = useState(
    Array(currentWord.length).fill(null)
  );

  useEffect(() => {
    selectRandomWord(); // Call selectRandomWord once when the component mounts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  
  const [resetSlots, setResetSlots] = useState(false); // Add this state

  const selectRandomWord = () => {
    incrementCorrectCount(); // Increment the count if the word is complete
  
    console.log('Before selecting a new word:', currentWord, placedLetters);
    const remainingWords = words.filter(word => word.toUpperCase() !== currentWord);
    const randomIndex = Math.floor(Math.random() * remainingWords.length);
    const randomWord = remainingWords[randomIndex].toUpperCase();
    
    setCurrentWord(randomWord);
    setPlacedLetters(Array(randomWord.length).fill(null));
    setResetSlots(!resetSlots); // Toggle the resetSlots value
  
    console.log('After selecting a new word:', currentWord, placedLetters);
  };
  

  // Define handleDropLetter first
const handleDropLetter = useCallback((letter, index) => {
  const newPlacedLetters = [...placedLetters];
  newPlacedLetters[index] = letter;
  setPlacedLetters(newPlacedLetters);
}, [placedLetters]);

// Then define handleKeyPress
const handleKeyPress = useCallback((event) => {
  const key = event.key.toUpperCase();
  // ... rest of the code
  if (currentWord.includes(key) && key.length === 1 && key.match(/[A-Z]/)) {
    const index = placedLetters.findIndex(item => item === null);
    if (index !== -1) {
      handleDropLetter(key, index); // No problem here now
    }
  }
  // ... rest of the code
}, [placedLetters, currentWord, handleDropLetter]); // Dependencies are in correct order


    useEffect(() => {
      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, [handleKeyPress]);
  
  

  const isCorrect = (index) => {
    return placedLetters[index] === currentWord[index];
  };


  
  
  

  const playAudio = () => {
    audioRef.current.play();
    audioRef.current.onended = () => {
      setShowHint(true);
    };
  };

  const toggleMute = () => {
    setIsMuted((prevMuted) => {
      const nextMuted = !prevMuted;
      audioRef.current.muted = nextMuted;
      return nextMuted;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
      <div className="correct-header-container">
        {isWordComplete() && <h1 className="correct-header">CORRECT!</h1>}
      </div>
      
        {showHint && (
          <div className="hint">Drag the letters to form the word!</div>
        )}
        <ControlPanel
        
          playAudio={playAudio}
          isMuted={isMuted}
          toggleMute={toggleMute}
          
        />
        <div className="word-slots">
  <p className="count-display">{correctCount}/{words.length}</p>
  {placedLetters.map((letter, index) => (
    <BoardSpot
      key={index}
      letter={letter} // Pass the letter from the placedLetters array
      correct={isCorrect(index)}
      onDropLetter={(droppedLetter) => handleDropLetter(droppedLetter, index)}
      reset={resetSlots}
    />
  ))}
  <button className="next-button" onClick={selectRandomWord}>Next</button>
</div>

        {currentWord && (
          // images need to be in public folder to be accessible without importing
          <img
            src={`/images/fruit/${currentWord.toLowerCase()}.png`}
            alt={currentWord.trim()}
            className="word-image"
          />
        )}

        {/* <GameBoard word={word} /> */}
        <LetterPool />
      </div>
    </DndProvider>
  );
}

export default App;
