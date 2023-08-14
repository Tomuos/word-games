import React from 'react';
import GameBoard from './GameBoard';
import LetterPool from './LetterPool';
import ControlPanel from './ControlPanel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="app">
                <ControlPanel />
                <GameBoard />
                <LetterPool />
            </div>
        </DndProvider>
    );
}
