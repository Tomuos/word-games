import React from "react";
import GameBoard from "../GameBoard/GameBoard";
import LetterPool from "../LetterPool/LetterPool";
import ControlPanel from "../ControlPanel/ControlPanel";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  // I made a temporary word array to pass to the gameboard component
  // to fix the vaguely worded error - item is undefined
  const word = ["word", "word2", "word3", "word4"];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <ControlPanel />
        <GameBoard word={word} />
        <LetterPool />
      </div>
    </DndProvider>
  );
}
export default App;
