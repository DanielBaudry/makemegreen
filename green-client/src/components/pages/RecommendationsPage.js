import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {requestData} from "../../reducers/data";
import withLogin from "../hocs/withLogin"
import RecommendationItem from "../items/RecommendationItem";
import get from "lodash.get";
import avatar from '../../assets/avatar.svg'

class RecommendationsPage extends Component {


    constructor (props) {
        super(props)
        this.state = { isLoading: true,
                       recommendations: []
        }
    }

    componentWillMount () {
        this.props.dispatch(requestData('GET', '/recommendations', {
            handleSuccess: (state, action) => {
                const recommendations = get(action, 'data.recommendations')
                this.setState({
                    "isLoading": false,
                    "recommendations": recommendations,
                })
            },
        }))
    }

    render () {
        const { isLoading } = this.state
        const { user } = this.props

        return(
            <div className="text-center">
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
                                <li className="nav-item ">
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
                Recommendations
                <div className="recommendations-section">
                    <div className="container">
                        <div className="row justify-content-md-center">
                            {!isLoading ? (
                                    this.state.recommendations.map(recommendation => (
                                        <RecommendationItem key={recommendation.id} recommendation={recommendation} />
                            ))
                            ):(
                                <div>Chargement en cours...</div>
                            )
                                }
                        </div>
                    </div>
                </div>
                {/*<div className="my-5 pt-5 text-center">*/}
                    {/*<NavLink to="/recommendation" className="btn btn-primary">*/}
                        {/*{"Ajouter ma recommandation"}*/}
                    {/*</NavLink>*/}
                {/*</div>*/}
            </div>
        )
    }
}


export default compose(
    withLogin({ failRedirect: '/welcome' }),
    connect()
)(RecommendationsPage)