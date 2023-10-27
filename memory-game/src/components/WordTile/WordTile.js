// src/components/WordTile/WordTile.js

import React from 'react';
import './WordTile.css';

function WordTile({ word, isRevealed, onClick, className }) {
  return (
      <div className={`word-tile ${className}`} onClick={onClick}>
          {isRevealed ? word : '?'}
      </div>
  );
}

export default WordTile;
