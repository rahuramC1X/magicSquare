import React from 'react';
import MagicSquare from './Ms'; // Adjust the path based on your project structure

const App = () => {
  const headerStyle = {
    color: 'gold',
    textAlign: 'center' // Set the desired text alignment for the h1 element
  };

  return (
    <div className="app-container">
      <h1 style={headerStyle}>Magic Square!!!</h1>
      <MagicSquare m={4} n={2024} />
    </div>
  );
};

export default App;

