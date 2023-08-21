import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import './BoardSpot.css';

function BoardSpot({ letter, correct, onDropLetter }) {
  // Existing state declaration
  const [placedLetter, setPlacedLetter] = useState(null);

  const [{ isOver }, drop] = useDrop({
    accept: "LETTER",
    drop: (item) => {
      onDropLetter(item.letter);
      setPlacedLetter(item.letter);
      return { id: item.id };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    }),
  });

  return (
    <div ref={drop} className={`slot ${correct ? "correct" : "incorrect"}`} style={{ background: isOver ? 'lightblue' : '#EDEDED' }}>
      {placedLetter ? <div>{placedLetter}</div> : null}
    </div>
  );
}

export default BoardSpot;
