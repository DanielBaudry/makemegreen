import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import logo from '../../assets/white_tree.png'
import {requestData} from "../../reducers/data";
import get from "lodash.get";
import { compose } from 'redux'
import {connect} from "react-redux";

import '../../styles/welcome.css'

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
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Make Me Green</h1>
                </header>

                <div className="welcome-content">
                    {/* TODO: à migrer dans le site vitrine */}
                    {/*<div className="welcome-message">*/}
                        {/*<h5>Bienvenu</h5>*/}
                        {/*<span>*/}
                            {/*Make Me Green est né d'un concept simple, il est temps de changer nos habitudes*/}
                            {/*afin de pouvoir continuer de profiter des toutes les choses qui rendent la vie agréable.*/}
                        {/*</span>*/}
                        {/*<h5>Le concept</h5>*/}
                        {/*<span>*/}
                            {/*L'application Make Me Green permet un accompagnement sur mesure pour que chacun puisse*/}
                            {/*prendre conscience et améliorer son empreinte écologique.*/}
                            {/*Le service ne demande pas un effort de recherche ni de documentation pour savoir quelle*/}
                            {/*action sera la plus bénéfique. Nous souhaitons proposer à travers Make Me Green, un outil*/}
                            {/*sur mesure qui vous accompagnera tout au long de votre démarche.*/}
                        {/*</span>*/}
                    {/*</div>*/}

                    <div className="statistics-section">
                        {!isLoading ? (
                            <div className="text-center">
                                <span>Depuis le lancement de l'application,
                                    les utilisateurs de MakeMeGreen ont réussi à économier :
                                </span>
                                <br/>
                                <span>
                                    <strong>{this.state.total_saved} de C0²</strong>
                                </span>
                                <br/>
                                <span className="text-align">
                                    Et si vous étiez le prochain à participer cette aventure ?
                                </span>
                                <div className="sign-links text-center">
                                    <NavLink to="/footprint" className="btn btn-primary">
                                        {"Je m'inscris"}
                                    </NavLink>
                                    <div className="connexion-link">
                                        <NavLink to="/connexion">
                                            {"J'ai déjà un compte"}
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        ):(
                            <div className="text-center">Chargement en cours...</div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}


export default compose(
    connect()
)(LandingPage)
