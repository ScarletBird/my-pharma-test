import React from 'react';
import './App.css';

import Router from './routes';
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <Navbar />
      <Router />
    </div>
  );
}

export default App;
