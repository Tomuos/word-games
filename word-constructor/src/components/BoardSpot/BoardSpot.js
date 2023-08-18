import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

function BoardSpot({ onDropLetter }) {
    // State declaration inside the component
    const [placedLetter, setPlacedLetter] = useState(null);

    const [{ isOver }, drop] = useDrop({
        accept: "LETTER",
        drop: (item) => {
            onDropLetter(item.letter);
            setPlacedLetter(item.letter); // set the placed letter once it's dropped
            return { id: item.id };
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        }),
    });

    return (
        <div ref={drop} style={{ background: isOver ? 'lightblue' : 'white' }}>
            {placedLetter ? <div className="letter">{placedLetter}</div> : null}
        </div>
    );
}

export default BoardSpot;
