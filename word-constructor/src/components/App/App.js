import React, { useState, useRef, useEffect } from "react";
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
    console.log('Before selecting a new word:', currentWord, placedLetters);
    const remainingWords = words.filter(word => word.toUpperCase() !== currentWord);
    const randomIndex = Math.floor(Math.random() * remainingWords.length);
    const randomWord = remainingWords[randomIndex].toUpperCase();
    
    setCurrentWord(randomWord);
    setPlacedLetters(Array(randomWord.length).fill(null));
    setResetSlots(!resetSlots); // Toggle the resetSlots value
  
    console.log('After selecting a new word:', currentWord, placedLetters);
  };

 

  

  const isCorrect = (index) => {
    return placedLetters[index] === currentWord[index];
  };

  const handleDropLetter = (letter, index) => {
    const newPlacedLetters = [...placedLetters];
    newPlacedLetters[index] = letter;
    setPlacedLetters(newPlacedLetters);
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
          {Array.from(currentWord).map((letter, index) => (
            <BoardSpot
            key={index}
            letter={letter}
            correct={isCorrect(index)}
            onDropLetter={(droppedLetter) =>
            handleDropLetter(droppedLetter, index)
            }
            reset={resetSlots} // Use the resetSlots value
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
