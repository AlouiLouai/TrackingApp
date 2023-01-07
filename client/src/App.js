import React from 'react';
import Stack from 'react-bootstrap/Stack';
import './App.css';
import Chart from './Components/Chart';
import Second from './Components/Second';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Stack gap={3}>
          <Chart />
          <Second />
        </Stack>
      </header>
    </div>
  );
}

export default App;
