// src/components/ScoreDisplay/ScoreDisplay.js

import React from 'react';
import './ScoreDisplay.css';

function ScoreDisplay({ score }) {
  return (
    <div className="score-display">
      Score: {score}
    </div>
  );
}

export default ScoreDisplay;
