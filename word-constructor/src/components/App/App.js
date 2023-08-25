import React, { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";
import LetterPool from "../LetterPool/LetterPool";
import ControlPanel from "../ControlPanel/ControlPanel";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BoardSpot from "../BoardSpot/BoardSpot";
import appleAudio from "../../assets/audio/Apple.m4a";

function App() {
  const words = ["apple", "banana", "blackberry", "blueberry", "cherry", "lemon", "mango", "orange", "pineapple", "plum", "raspberry", "strawberry", "pear", "grapes", "kiwi"];
  const [currentWord, setCurrentWord] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // New state variable
  const [showHint, setShowHint] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(new Audio(appleAudio));
  const [correctCount, setCorrectCount] = useState(0);
  const [placedLetters, setPlacedLetters] = useState(Array(currentWord.length).fill(null));
  const [resetSlots, setResetSlots] = useState(false);

  useEffect(() => {
    selectNextWord(); // Call the function when the component mounts
  }, []);

  const incrementCorrectCount = () => {
    if (isWordComplete()) {
      setCorrectCount(correctCount + 1);
    }
  };

  const isWordComplete = () => {
    return placedLetters.every((letter, index) => letter === currentWord[index]);
  };

  const selectNextWord = () => {
    incrementCorrectCount();

    if (currentWordIndex >= words.length - 1) {
      setCurrentWordIndex(0); // Loop back to the beginning
    } else {
      setCurrentWordIndex(currentWordIndex + 1); // Increment the index
    }

    const nextWord = words[currentWordIndex].toUpperCase();
    setCurrentWord(nextWord);
    setPlacedLetters(Array(nextWord.length).fill(null));
    setResetSlots(!resetSlots);
  };

  const handleDropLetter = useCallback((letter, index) => {
    const newPlacedLetters = [...placedLetters];
    newPlacedLetters[index] = letter;
    setPlacedLetters(newPlacedLetters);
  }, [placedLetters]);

  const handleKeyPress = useCallback((event) => {
    const key = event.key.toUpperCase();
    if (currentWord.includes(key) && key.length === 1 && key.match(/[A-Z]/)) {
      const index = placedLetters.findIndex(item => item === null);
      if (index !== -1) {
        handleDropLetter(key, index);
      }
    }
  }, [placedLetters, currentWord, handleDropLetter]);

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
        {showHint && <div className="hint">Drag the letters to form the word!</div>}
        <ControlPanel playAudio={playAudio} isMuted={isMuted} toggleMute={toggleMute} />
        <div className="word-slots">
          <p className="count-display">{correctCount}/{words.length}</p>
          {placedLetters.map((letter, index) => (
            <BoardSpot
              key={index}
              letter={letter}
              correct={isCorrect(index)}
              onDropLetter={(droppedLetter) => handleDropLetter(droppedLetter, index)}
              reset={resetSlots}
            />
          ))}
          <button className="next-button" onClick={selectNextWord}>Next</button>
        </div>
        {currentWord && <img src={`/images/fruit/${currentWord.toLowerCase()}.png`} alt={currentWord.trim()} className="word-image" />}
        <LetterPool />
      </div>
    </DndProvider>
  );
}

export default App;
