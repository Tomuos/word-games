// ./src/views/Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="App-header">
      <h1>Welcome to Spell Quest</h1>
      <p>Improve your spelling through fun and interactive challenges.</p>
      <Link to="/play" className="App-link">Start Playing</Link>
    </div>
  );
};

export default Home;
