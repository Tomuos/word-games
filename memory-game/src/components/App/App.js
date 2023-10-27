// src/components/App/App.js

import React from 'react';
import './App.css';
import GameBoard from '../GameBoard/GameBoard';

function App() {
  return (
    <div className="App">
      <h1>Phonetic Memory Game</h1>
      <GameBoard />
    </div>
  );
}

export default App;
