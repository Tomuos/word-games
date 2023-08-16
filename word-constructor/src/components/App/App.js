import React, { useState } from "react";
import GameBoard from "../GameBoard/GameBoard";
import LetterPool from "../LetterPool/LetterPool";
import ControlPanel from "../ControlPanel/ControlPanel";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BoardSpot from "../BoardSpot/BoardSpot";


function App() {
  // I made a temporary word array to pass to the gameboard component
  // to fix the vaguely worded error - item is undefined
  const word = ["word", "word2", "word3", "word4"];
  const [currentWord, setCurrentWord] = useState("APPLE"); // This is just an example word to start with.
  const [showHint, setShowHint] = useState(false);


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
      {showHint && <div className="hint">Drag the letters to form the word!</div>}

        <ControlPanel />
        <div className="word-slots">
    {Array.from(currentWord).map((_, index) => (
        <BoardSpot key={index} onDropLetter={handleDropLetter} />
    ))}
</div>

        <GameBoard word={word} />
        <LetterPool />
      </div>
    </DndProvider>
  );
  function playAudio() {
    const audio = new Audio("/path_to_assets/apple.mp3"); // Replace with the actual path to your audio file.
    audio.play();
    audio.onended = () => {
        setShowHint(true);
    };
}

}
export default App;
