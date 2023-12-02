import React from 'react';
import './LetterPool.css';
import DraggableLetter from '../DraggableLetter/DraggableLetter'; // Updated path


// LETTER POOL COMPONENT should contain all the letters of the alphabet
function LetterPool() {
    return (
        <div className="letter-pool-container">
          <div className="letter-pool">
            { "abcdefghijklmnopqrstuvwxyz".split("").map((letter, index) => {
                return <DraggableLetter key={index} letter={letter} />
            })}
          </div>
        </div>
      );
}



export default LetterPool;
