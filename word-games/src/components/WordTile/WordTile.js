// src/components/WordTile/WordTile.js

import React from 'react';
import './WordTile.css';

function WordTile({ word, isRevealed, onClick }) {
  return (
    <div className={`word-tile ${isRevealed ? 'selected' : ''}`} onClick={onClick}>
      {isRevealed ? word : '?'}
    </div>
  );
}

export default WordTile;
