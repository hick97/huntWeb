import React, { Component } from 'react';
import api from './services/api';
import './style.css';

import Header from './components/header';
import Main from './pages/main';


const App = () => (
      <div className="App">
        <Header />
        <Main />
      </div>
);

export default App;
