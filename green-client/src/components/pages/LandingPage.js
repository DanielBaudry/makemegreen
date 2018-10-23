import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import logo from '../../assets/white_tree.png'
import {requestData} from "../../reducers/data";
import get from "lodash.get";
import { compose } from 'redux'
import {connect} from "react-redux";

class LandingPage extends Component {

    constructor (props) {
        super(props)
        this.state = { isLoading: true,
            total_saved: 0
        }
    }

    componentWillMount () {
        this.props.dispatch(requestData('GET', '/benefit', {
            handleSuccess: (state, action) => {
                const total_saved = get(action, 'data.total_saved')
                console.log(total_saved)
                this.setState({
                    "isLoading": false,
                    "total_saved": total_saved,
                })
            },
        }))
    }

    render () {

        const { isLoading } = this.state

       return(
            <div className="text-center">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Make Me Green</h1>
                </header>
                <h1>Make Me Green</h1>
                <span></span>

                <div className="statistics-section">
                    {!isLoading ? (
                        <div>
                            <p>Depuis le lancement de l'application
                               Les utilisateurs de MakeMeGreen ont réussi à économier :</p>
                            <span><strong>{this.state.total_saved} de C0²</strong></span>
                        </div>
                    ):(
                        <div className="text-center">Chargement en cours...</div>
                    )}
                </div>

                <div className="my-5 pt-5 text-center">
                    <NavLink to="/connexion" className="btn btn-primary">
                        {"Connexion"}
                    </NavLink>
                    <NavLink to="/footprint" className="btn btn-primary">
                        {"Inscription"}
                    </NavLink>
                </div>
            </div>
        )
    }
}


export default compose(
    connect()
)(LandingPage)
