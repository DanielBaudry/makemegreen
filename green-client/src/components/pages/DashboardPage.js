import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {requestData} from "../../reducers/data";
import FootprintItem from "../items/FootprintItem";
import { withLogin } from "../hocs/withLogin"

class DashboardPage extends Component {

    constructor () {
        super()
    }

    componentDidMount () {
        this.props.dispatch(requestData('GET', '/footprint/me'))
    }

    render () {
        const { footprints } = this.props

        return(
            <div class="text-center">
                Dashboard
                <div className="footprints-page">
                    ICI LA LISTE DES FOOTPRINTS
                    {
                        footprints.map(footprint => (
                            <FootprintItem key={footprint.id} footprint={footprint} />
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ footprints: state.data.footprints })
)(DashboardPage)
