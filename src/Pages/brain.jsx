import React, { useState, useEffect } from 'react';

const NeuralNetworkComponent = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Create a new instance of a neural network
    const net = new brain.NeuralNetwork();

    // Train the network with XOR data
    net.train([
      { input: [0, 0], output: [0] },
      { input: [0, 1], output: [1] },
      { input: [1, 0], output: [1] },
      { input: [1, 1], output: [0] },
    ]);

    // Run the network with an input to get an output
    const output = net.run([1, 0]); // Expected output is close to 1
    setResult(output);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Brain.js Neural Network in React</h1>
      <p>Output for input [1, 0]: {result ? result : 'Loading...'}</p>
    </div>
  );
};

export default NeuralNetworkComponent;
