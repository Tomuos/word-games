import React from 'react';
// LETTER POOL COMPONENT should contain all the letters of the alphabet
function LetterPool() {
    return (
        <div className="letter-pool">
            { "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter, index) => {
                return <div key={index} className="letter">{letter}</div>
            })}
        </div>
    );
}

export default LetterPool;
