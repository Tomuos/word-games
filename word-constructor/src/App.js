import React from 'react';
import GameBoard from './GameBoard';
import LetterPool from './LetterPool';
import ControlPanel from './ControlPanel';

function App() {
    return (
        <div className="app">
            <ControlPanel />
            <GameBoard />
            <LetterPool />
        </div>
    );
}

export default App;
