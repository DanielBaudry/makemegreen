import React, { Component } from 'react'

import logo from './assets/logo.svg'
import './styles/App.css'

//TODO: put real stylesheet
import './styles/bootstrap/css/bootstrap.css'

class App extends Component {
  render() {
    const { children } = this.props
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome React</h1>
        </header>
        {children}
      </div>
    );
  }
}

export default App;
