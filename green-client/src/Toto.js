import React, { Component } from 'react'
import logo from './assets/logo.svg'
import './styles/App.css'

class Toto extends Component {
  render() {
    return (
      <div className="Toto">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Toto</h1>
        </header>
        <p className="App-intro">
          Toto
        </p>
      </div>
    );
  }
}

export default Toto;
