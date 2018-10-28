import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {requestData} from "../../reducers/data";
import withLogin from "../hocs/withLogin"
import ActivityItem from "../items/ActivityItem";
import avatar from '../../assets/avatar.svg'

class ActivitiesPage extends Component {


    constructor () {
        super()
        this.state = { name: null,
                       content: null,
                       benefit: null,
                       type: null,
                       difficulty_level: null}
    }

    componentDidMount () {
        this.props.dispatch(requestData('GET', 'activities'))
    }

    render () {
        let activities_list = []

        const { activities, user } = this.props
        if( activities && activities.length > 0){
            activities_list = activities[0]['activities']
        }


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
                My activities
                <div className="activities-section">
                    <div className="container">
                        <div className="row justify-content-md-center">
                                {
                                    activities_list.map(activity => (
                                        <ActivityItem key={activity.id} activity={activity} />
                                    ))
                                }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ activities: state.data.activities})

export default compose(
    withLogin({ failRedirect: '/welcome' }),
    connect(mapStateToProps)
)(ActivitiesPage)