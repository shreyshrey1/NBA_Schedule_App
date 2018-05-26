import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './js/components/Form'
import MyTeams from './js/components/MyTeams';
import MyGames from './js/components/MyGames';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        </p>
        <Form />
        <MyTeams />
        <MyGames />
      </div>
    );
  }
}

export default App;
