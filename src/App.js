import React, { Component } from 'react';
import "./styles.css";
import Routes from './routes';
import Header from './components/Header'

const App = () => (
  <div className="App">     
        <Header></Header>
        <Routes></Routes>
    </div>
);

export default App;
