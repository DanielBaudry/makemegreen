import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {requestData} from "../../reducers/data";
import withLogin from "../hocs/withLogin"
import Highcharts from "highcharts"
import moment from 'moment'
import get from "lodash.get";
import avatar from '../../assets/avatar.svg'

class DetailsPage extends Component {


    constructor () {
        super()
        this.state = { isLoading: true
        }
    }

    componentWillMount () {

        this.props.dispatch(requestData('GET', '/footprints', {
        }))

    }

    render () {

        const { user } = this.props

        return(
            <div className="text-center">
                <div className="header-menu">
                    <nav className="navbar navbar-dark">
                        <NavLink className="navbar-brand" to="/home">
                            <span>
                                <img alt="" src={avatar} className="navbar-avatar" />
                            </span>
                            <span>
                            {user && user.username}
                            </span>
                        </NavLink>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <NavLink to="/home" className="nav-link">
                                        {"Home"}
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/recommendations" className="nav-link">
                                        {"Recommandations"}
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/activities" className="nav-link">
                                        {"Mon activité"}
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/progress" className="nav-link">
                                        {"Mes progrès"}
                                    </NavLink>
                                </li>
                                <li>
                                    <a
                                        className="nav-link"
                                        onClick={this.onSignOutClick}>
                                        Déconnexion
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                My progresses
                <div className="progress-section">
                    <div id="container"></div>
                </div>
            </div>
        )
    }
}


export default compose(
    withLogin({ failRedirect: '/welcome' }),
    connect()
)(DetailsPage)