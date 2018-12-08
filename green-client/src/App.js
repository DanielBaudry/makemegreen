import React, { Component } from 'react'

//TODO: put real stylesheet
import './styles/bootstrap/css/bootstrap.css'

// TODO: comme ça ?
// import 'antd/dist/antd.css';


import './styles/App.css'
import './styles/signin.css'
import NavBar from "./components/items/NavBar";

class App extends Component {
    render() {
        const { children } = this.props

        return (
            <div className="App">
                <NavBar />
                {children}
            </div>
        );
    }
}

export default App;
