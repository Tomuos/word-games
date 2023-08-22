import React, { useState, useRef } from "react";
import './App.css';
import GameBoard from "../GameBoard/GameBoard";
import LetterPool from "../LetterPool/LetterPool";
import ControlPanel from "../ControlPanel/ControlPanel";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BoardSpot from "../BoardSpot/BoardSpot";
import appleImage from '../../assets/images/fruit/apple.png';
import appleAudio from '../../assets/audio/Apple.m4a'; 
 

import 'font-awesome/css/font-awesome.min.css';



function App() {
    const word = ["word", "word2", "word3", "word4"];
    const [currentWord, setCurrentWord] = useState("APPLE");
    const [showHint, setShowHint] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(new Audio(appleAudio));

    const [placedLetters, setPlacedLetters] = useState(Array(currentWord.length).fill(null));

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
        setIsMuted(prevMuted => {
            const nextMuted = !prevMuted;
            audioRef.current.muted = nextMuted;
            return nextMuted;
        });
    };

  

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="app">
                {showHint && <div className="hint">Drag the letters to form the word!</div>}
                <ControlPanel playAudio={playAudio} isMuted={isMuted} toggleMute={toggleMute} />
                
                <div className="word-slots">
                {Array.from(currentWord).map((letter, index) => (
                <BoardSpot key={index} letter={letter} correct={isCorrect(index)} onDropLetter={(droppedLetter) => handleDropLetter(droppedLetter, index)} />
                ))}
                </div>

                <img src={appleImage} alt="Apple" className="word-image"/>

                {/* <GameBoard word={word} /> */}
                <LetterPool />
            </div>

        </DndProvider>
    );
}

export default App;
