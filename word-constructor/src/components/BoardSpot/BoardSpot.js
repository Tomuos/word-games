import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import './BoardSpot.css';

function BoardSpot({ letter, correct, onDropLetter, reset }) {
  const [placedLetter, setPlacedLetter] = useState(null);

  useEffect(() => {
    if (reset) setPlacedLetter(null);
  }, [reset]);
  


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
