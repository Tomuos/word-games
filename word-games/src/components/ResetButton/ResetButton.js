// src/components/ResetButton/ResetButton.js

import React from 'react';
import './ResetButton.css';

function ResetButton({ onClick }) {
  return (
    <button className="reset-button" onClick={onClick}>
      Restart Game
    </button>
  );
}

export default ResetButton;
