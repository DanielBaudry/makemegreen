import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {requestData} from "../../reducers/data";
import withLogin from "../hocs/withLogin"
import ActivityItem from "../items/ActivityItem";


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

        const { activities } = this.props
        if( activities && activities.length > 0){
            activities_list = activities[0]['activities']
        }


        return(
            <div className="text-center">
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
                <div className="my-5 pt-5 text-center">
                    <NavLink to="/home" className="btn btn-primary">
                        {"Retour au tableau de bord"}
                    </NavLink>
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