// src/components/Card/Card.js

import React, { useState } from 'react';
import './Card.css';

function Card({ sound }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(true);
    
    const audio = new Audio(`/sounds/${sound}.mp3`);
    audio.play();

    // Add further logic for card matching if needed
  };

  return (
    <div className="card" onClick={handleCardClick}>
      {isFlipped ? sound : "?"}
    </div>
  );
}

export default Card;
