import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import {requestData} from "../../reducers/data";
import withLogin from "../hocs/withLogin"
import ActivityItem from "../items/ActivityItem";
import NavBar from "../items/NavBar";

import '../../styles/activities.css'
import get from "lodash.get";

class ActivitiesPage extends Component {

    constructor () {
        super()
        this.state = { isLoading: true,
            activities: []}
    }

    componentDidMount () {
        this.props.dispatch(requestData('GET', 'activities', {
            handleSuccess: (state, action) => {
            const activities = get(action, 'data.activities')
            this.setState({
                "activities": activities,
                "isLoading": false,
            })
        },}))
    }

    render () {

        const { isLoading } = this.state

        return(
            <div>

                <NavBar />

                <div className="title-header">
                    <h5>
                        Mes activités
                    </h5>
                </div>

                <div className="container content">
                    {!isLoading ? (
                        this.state.activities.map(activity => (
                            <ActivityItem key={activity.id} activity={activity} />
                        ))
                    ):(
                        <span>Chargement en cours...</span>
                    )}
                </div>
            </div>
        )
    }
}

export default compose(
    withLogin({ failRedirect: '/welcome' }),
    connect()
)(ActivitiesPage)