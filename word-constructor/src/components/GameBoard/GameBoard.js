import React from "react";
import BoardSpot from "../BoardSpot/BoardSpot";

function GameBoard({ word }) {
  const handleDropLetter = (letter) => {
    // Handle what happens when a letter is dropped.
    // For instance, check if the word is being formed correctly.
  };

  return (
    <div className="game-board">
      {Array.from(word).map((_, index) => (
        <BoardSpot key={index} onDropLetter={handleDropLetter} />
      ))}
    </div>
  );
}
export default GameBoard;
