import React from 'react';
import './App.scss';
import { io } from "socket.io-client";
import Paths from './components/Paths';

function App() {
  return (
    <div className="App">
        <Paths />
    </div>
  );
}

export default App;
