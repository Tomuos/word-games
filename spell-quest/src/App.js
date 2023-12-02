import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Play from './views/Play';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact component={Home} />
        <Route path="/play" component={Play} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

export default App;
