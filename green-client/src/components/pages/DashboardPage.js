import get from 'lodash.get'
import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {requestData} from "../../reducers/data";
import FootprintItem from "../items/FootprintItem";
import withLogin from "../hocs/withLogin"
import avatar from '../../assets/avatar.svg'
import {THUMBS_URL} from "../../utils/config";

class DashboardPage extends Component {

    constructor (props) {
        super(props)
        this.state = { isLoading: true,
            footprints: [],
            statistics: [],
            activity_count: 0
        }
    }

    onSignOutClick = () => {
        const { history } = this.props
        this.props.dispatch(requestData('GET', '/users/signout', {
            handleSuccess: () => {
                history.push('/connexion')
            },
        }))
    }

    componentWillMount () {
        this.props.dispatch(requestData('GET', '/dashboard', {
            handleSuccess: (state, action) => {
                const footprints = get(action, 'data.footprints')
                const statistics = get(action, 'data.statistics')
                const activity_count = get(get(action, 'data.activities'),'activity_count')
                console.log(statistics)
                this.setState({
                    "activity_count": activity_count,
                    "isLoading": false,
                    "footprints" : footprints,
                    "statistics" : statistics
                })
            },
        }))
    }

    render () {

        const { isLoading, activity_count } = this.state
        const { user } = this.props

        console.log("User", user)

        return(
            <div className="main">

                <div className="header-menu">
                    <nav className="navbar navbar-dark">
                        <a className="navbar-brand" href="#">
                            <span>
                                <img alt="" src={avatar} className="navbar-avatar" />
                            </span>
                            <span>
                            {user && user.username}
                            </span>
                        </a>
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

                <div className="challenge-section">
                    Un ami vient de t'envoyer un nouveau challenge
                </div>

                <div className="container footprints-section">
                {!isLoading ? (
                    this.state.footprints.map(footprint => (
                        <FootprintItem key={footprint.id} footprint={footprint} />
                    ))
                ):(
                    <div className="text-center">Chargement en cours...</div>
                )}
                </div>

                <div className="activity-section">
                    {!isLoading ? (
                        <a href="/activities" className="text-center">
                        {activity_count >0 ? (
                            <div>
                                <span>Vous avez { this.state.activity_count } activités en cours !</span>
                            </div>
                        ):(
                            <span>Vous n'avez aucune activité en cours. Besoin d'une recommendations ?</span>
                        )}
                        </a>
                    ):(
                        <span className="text-center">Chargement en cours...</span>
                    )}
                </div>

                <div className="container">
                <div className="row">
                    <div className="col-6 leaderbord-section">
                        {!isLoading ? (
                            <div>
                                <div>
                                    <img alt="" src={THUMBS_URL + "up"} className="leaderbord-avatar" />
                                </div>
                                <br />
                                <span>Score: 2000 CO2</span><br />
                                <span>Placement: <strong>2500/4000</strong></span>
                            </div>
                        ):(
                            <span className="text-center">Chargement en cours...</span>
                        )}
                    </div>

                    <div className="col-6 engine-section">
                        {!isLoading ? (
                            <div>
                                <div>
                                    <img alt="" src={THUMBS_URL + "food_color"} className="leaderbord-avatar" />
                                </div>
                                <br />
                                <span>Envie de recommendations plus adaptées ? Aide-nous à améliorer notre algorithme !</span>
                            </div>
                        ):(
                            <span className="text-center">Chargement en cours...</span>
                        )}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default compose(
    withLogin({ failRedirect: '/welcome' }),
    connect()
)(DashboardPage)
