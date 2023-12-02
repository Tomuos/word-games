import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import './BoardSpot.css';

function BoardSpot({ letter, correct, onDropLetter, reset }) {

  useEffect(() => {
    if (reset) {
      // Do something if needed when reset is true
    }
  }, [reset]);

  const [{ isOver }, drop] = useDrop({
    accept: "letter",
    drop: (item) => {
      onDropLetter(item.letter);
      return { id: item.id };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    }),
  });

  

  return (
    <div ref={drop} className={`slot ${correct ? "correct" : "incorrect"}`} style={{ background: isOver ? 'lightblue' : '#EDEDED' }}>
      {letter ? <div>{letter}</div> : null}
    </div>
  );
}

export default React.memo(BoardSpot);

