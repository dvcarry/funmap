import React, { useState } from 'react';
import './App.css';
import { Maps } from './components/Maps/Maps'
import { Routes } from './components/Routes/Routes';


function App() {

  const [center, setCenter] = useState(null)

  return (
    <div className="grid">
        <Routes center={center}/>
        <Maps setCenter={setCenter}/>     
    </div>
  );
}

export default App;
