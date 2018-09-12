import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {requestData} from "../../reducers/data";

class DashboardPage extends Component {

    constructor () {
        super()
        this.state = { email: null,
                        password: null}
    }

    componentDidMount () {
        this.props.dispatch(requestData('GET', 'users/current'))
    }

    render () {
        // const { footprints } = this.props
        const { user } = this.props
        console.log(user.toString())

        return(
            <div class="text-center">
                Dashboard
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.data.user })
)(DashboardPage)