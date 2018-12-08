import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import {requestData} from "../../reducers/data";
import withLogin from "../hocs/withLogin"

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

        return(
            <div className="text-center">
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