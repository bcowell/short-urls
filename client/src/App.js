import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>short-urls</h1>
      </header>
      <div className="form-container">
        <div className="row">
          <input className="input"></input>
          <button className="button">SHORTEN</button>
        </div>
        <div className="row">
          <div className="short-url">http://localhost:3001/api/v1/y7</div>
          <button className="button">COPY</button>
        </div>
      </div>
    </div>
  );
}

export default App;
