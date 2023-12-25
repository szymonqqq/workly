import './App.css';
import React, { useState } from 'react';
import CheckToken from './components/checkToken';
import Nav from './components/Nav';

function App() {
  const [token, setToken] = useState('');

  return (
    <>
      <div className="App">
        <CheckToken setToken={setToken} />
        <Nav token={token} setToken={setToken} />
      </div>
    </>
  );
}

export default App;
