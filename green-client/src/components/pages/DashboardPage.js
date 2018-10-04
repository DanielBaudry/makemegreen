import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {requestData} from "../../reducers/data";
import FootprintItem from "../items/FootprintItem";
import withLogin from "../hocs/withLogin"

class DashboardPage extends Component {

    constructor () {
        super()
        this.state = { footprints: null,
            leaderbord: null,
            statistics: null
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

    componentDidMount () {
        this.props.dispatch(requestData('GET', '/dashboard'))
    }

    render () {
        let footprints = []
        let statistics = []

        const { dashboard } = this.props
        if( dashboard.length > 0){
            footprints = dashboard[0]['footprints']
            statistics = dashboard[0]['statistics']
        }


        return(
            <div className="container dashboard-section">
                <div className="row footprints-section">
                {
                    footprints.map(footprint => (
                        <FootprintItem key={footprint.id} footprint={footprint} />
                    ))
                }
                </div>

                <div className="row statistics-section">
                    <div className="col">
                        <p>Quantité total de CO2 economisée par les utilisateurs de MakeMeGreen :</p>
                        <span><strong>{statistics.total_carbon_saved} de C0²</strong></span>
                    </div>
                </div>

                <div className="row recommendations-section">
                    <div className="col">
                        <NavLink to="/recommendations" className="btn btn-primary">
                            {"Recommandations"}
                        </NavLink>
                    </div>
                </div>

                <div className="row actitivities-section">
                    <div className="col">
                        <NavLink to="/activities" className="btn btn-primary">
                            {"Mon activité"}
                        </NavLink>
                    </div>
                </div>

                <div className="row deconnexion-section">
                    <div className="col">
                        <button
                            className="btn btn-secondary btn-lg"
                            onClick={this.onSignOutClick}>
                            Déconnexion
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

DashboardPage.defaultProps = {
    dashboard: [],
    footprints: null,
    leaderbord: null
}

const mapStateToProps = state => ({ dashboard: state.data.dashboard})

export default compose(
    withLogin({ failRedirect: '/welcome' }),
    connect(mapStateToProps)
)(DashboardPage)
