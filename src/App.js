import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './js/components/Form'
import MyTeams from './js/components/MyTeams';
import MyGames from './js/components/MyGames';
import Standings from './js/components/Standings';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">NBA Schedule App</h1>
        </header>
        <p className="App-intro">
        </p>
        <Form />
        <MyTeams />
        <MyGames />
        <Standings />
      </div>
    );
  }
}

export default App;
