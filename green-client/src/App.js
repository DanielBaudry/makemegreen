import React, { Component } from 'react'

//TODO: put real stylesheet
import './styles/bootstrap/css/bootstrap.css'

// TODO: comme ça ?
// import 'antd/dist/antd.css';

import logo from './assets/white_tree.png'
import './styles/App.css'
import './styles/signin.css'

class App extends Component {
  render() {
    const { children } = this.props
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Make Me Green</h1>
        </header>
        {children}
      </div>
    );
  }
}

export default App;
