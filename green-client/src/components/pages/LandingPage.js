import React, { Component } from 'react';
import {connect} from "react-redux";
import { NavLink } from 'react-router-dom'

class LandingPage extends Component {

    render () {
       return(
            <div class="text-center">
                <h1>Landing Page</h1>
                <span>Ici on présente Make Me Green</span>
                <div class="my-5 pt-5 text-center">
                    <NavLink to="/connexion" className="button btn-primary btn-lg active">
                        {"Connexion"}
                    </NavLink>
                    <NavLink to="/footprint" className="button btn-primary btn-lg active">
                        {"Inscription"}
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default connect()(LandingPage)
