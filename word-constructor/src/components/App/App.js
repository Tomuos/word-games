import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./App.css";
import LetterPool from "../LetterPool/LetterPool";
import { DndProvider } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import BoardSpot from "../BoardSpot/BoardSpot";
import Footer from "../Footer/Footer";


// Define the isTouchDevice function
// function isTouchDevice() {
//   return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
// }

function App() {
  const words = useMemo(() => [
    "apple", "banana", "blackberry", "blueberry", 
    "cherry", "lemon", "mango", "orange", 
    "pineapple", "plum", "raspberry", "strawberry", 
    "pear", "grapes", "kiwi"
  ], []);

  const [currentWord, setCurrentWord] = useState(words[0]); // Initialize to the first word
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const [correctCount, setCorrectCount] = useState(0);
  const [placedLetters, setPlacedLetters] = useState(Array(currentWord.length).fill(null));
  const [resetSlots, setResetSlots] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  // check if touch device
  // const backend = isTouchDevice() ? TouchBackend() : HTML5Backend;


  const isWordComplete = useCallback(() => {
    return placedLetters.every((letter, index) => letter === currentWord[index]);
  }, [placedLetters, currentWord]);

  const incrementCorrectCount = useCallback(() => {
    if (isWordComplete()) {
      setCorrectCount(correctCount + 1);
    }
  }, [correctCount, isWordComplete]);

  const selectNextWord = useCallback(() => {
    incrementCorrectCount();
  
    let nextIndex;
    if (currentWordIndex >= words.length - 1) {
      nextIndex = 0; // Loop back to the beginning
    } else {
      nextIndex = currentWordIndex + 1; // Increment the index
    }
    
    setCurrentWordIndex(nextIndex);
    const nextWord = words[nextIndex]; // Keep the next word in lowercase
    setCurrentWord(nextWord);
    setPlacedLetters(Array(nextWord.length).fill(null));
    setResetSlots(!resetSlots);
  }, [incrementCorrectCount, currentWordIndex, words, resetSlots]);
  

  useEffect(() => {
    // Initialization code here
  }, [selectNextWord]); // Updated to include selectNextWord

  const handleDropLetter = useCallback((letter, index) => {
    const newPlacedLetters = [...placedLetters];
    newPlacedLetters[index] = letter;
    setPlacedLetters(newPlacedLetters);
  }, [placedLetters]);

  const handleKeyPress = useCallback((event) => {
    const key = event.key.toLowerCase();
    if (key === "backspace") {
      // Handle backspace key
      if (focusedInput !== null) {
        const newPlacedLetters = [...placedLetters];
        newPlacedLetters[focusedInput] = null;
        setPlacedLetters(newPlacedLetters);
        // Move focus to the previous input, if available
        if (focusedInput > 0) {
          setFocusedInput(focusedInput - 1);
        }
      }
    } else if (currentWord.includes(key) && key.length === 1 && key.match(/[a-z]/)) {
      // Handle regular letter input
      const index = placedLetters.findIndex(item => item === null);
      if (index !== -1) {
        handleDropLetter(key, index);
        // Set the focus to the next input, if available
        if (index < placedLetters.length - 1) {
          setFocusedInput(index + 1);
        }
      }
    }
  }, [placedLetters, currentWord, handleDropLetter, focusedInput]);
  
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const isCorrect = (index) => {
    return placedLetters[index]?.toLowerCase() === currentWord[index];
  };
  


  return (
    <DndProvider options={HTML5toTouch} >
      <div className="app">
      <div className="return-to-portfolio">
        <a href="https://tomdevspace.netlify.app/" className="return-button">Return to tomdevspace</a>
        </div>
        <div className="correct-header-container">
        {isWordComplete() && <h1 className="correct-header">CORRECT!</h1>}
        </div>
       
        <div className="word-slots">
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
          <p className="count-display">{correctCount}/{words.length}</p>
        </div>
        {currentWord && <img src={`/images/fruit/${currentWord.toLowerCase()}.png`} alt={currentWord.trim()} className="word-image" />}
        <LetterPool />
      </div>
    <Footer />
    </DndProvider>
  );
}

export default App;
