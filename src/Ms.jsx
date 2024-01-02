import React, { useState, useEffect } from 'react';

// Move randomList outside of generateMagicArray
function randomList(m, n) {
  let arr = new Array(m).fill(0);

  // To make the sum of the final list as n
  for (let i = 0; i < n; i++) {
    // Increment any random element from the array by 1
    arr[Math.floor(Math.random() * m)]++;
  }

  // Print the generated list
  return arr;
}

const MagicSquare = ({ m, n }) => {
  const [magicArray, setMagicArray] = useState([]);
  const [selectedCircles, setSelectedCircles] = useState([]);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    // Use randomList directly
    const arr = randomList(m, n);

    let minNumber = Math.min(...arr);

    const random_number = Math.floor(Math.random() * Math.floor(minNumber / 3));

    let array = Array.from({ length: m }, () => Array(m).fill(0));

    for (let i = 0; i < m; i++) {
      array[0][i] = arr[i];
    }

    array[1][0] = arr[3] + random_number;
    array[1][1] = arr[2] - random_number;
    array[1][2] = arr[1] - 3 * random_number;
    array[1][3] = arr[0] + 3 * random_number;

    array[2][0] = arr[1] - 2 * random_number;
    array[2][1] = arr[0] + 2 * random_number;
    array[2][2] = arr[3] + 2 * random_number;
    array[2][3] = arr[2] - 2 * random_number;

    array[3][0] = arr[2] + random_number;
    array[3][1] = arr[3] - random_number;
    array[3][2] = arr[0] + random_number;
    array[3][3] = arr[1] - random_number;

    setMagicArray(array);
  }, [m, n]);

  const handleCircleClick = (rowIndex, colIndex) => {
    const value = magicArray[rowIndex][colIndex];

    if (selectedCircles.length < 4) {
      setSelectedCircles(prevSelected => {
        const newSelected = [...prevSelected, value];

        if (newSelected.length === 4) {
          // Calculate the sum when four circles are selected
          const newSum = newSelected.reduce((acc, curr) => acc + curr, 0);
          setSum(newSum);
        }

        return newSelected;
      });
    } else {
      // Reset selection when 4 circles are selected
      setSelectedCircles([value]);
      setSum(value); // Set the sum to the newly selected value
    }
  };

  return (
    <div className="circle-grid-container">
      {magicArray.map((row, rowIndex) => (
        <div key={rowIndex} className="circle-grid-row">
          {row.map((number, colIndex) => (
            <div
              key={colIndex}
              className={`circle-grid-cell ${selectedCircles.includes(number) ? 'selected' : ''}`}
              style={{
                backgroundColor: selectedCircles.includes(number)? `rgb(255,0,0)`:`rgb(${150 + Math.floor(Math.random() * 106)}, ${150 + Math.floor(Math.random() * 106)}, ${150 + Math.floor(Math.random() * 106)})`,
                color: '#000000',
                fontSize: '24px',
                border: selectedCircles.includes(number) ? '10px solid #00ff00' : '5px solid #d4af37', // Add a border to selected circles
              }}
              onClick={() => handleCircleClick(rowIndex, colIndex)}
            >
              {number}
            </div>
          ))}
        </div>
      ))}
      {selectedCircles.length === 4 && (
        <div className="sum-display">
          <p style={{ margin: '10px 0 0', textAlign: 'center' }}>Sum: {sum}</p>
        </div>
      )}
    </div>
  );
};

export default MagicSquare;
