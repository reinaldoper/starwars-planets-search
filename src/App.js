import React from 'react';
import './App.css';
import StarProvider from './context/StarProvider';
import Home from './pages/Home';

function App() {
  return (
    <StarProvider>
      <Home />
    </StarProvider>
  );
}

export default App;
