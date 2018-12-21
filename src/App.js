import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Ecm from './monitor'
class App extends Component {
  render() {
    return (
      <div className="App" key='app'>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-log">
            <Ecm/>
        </div>
      </div>
    );
  }
}

export default App;
