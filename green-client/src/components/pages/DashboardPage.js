import get from 'lodash.get'
import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {requestData} from "../../reducers/data";
import FootprintItem from "../items/FootprintItem";
import withLogin from "../hocs/withLogin"

class DashboardPage extends Component {

    constructor (props) {
        super(props)
        this.state = { isLoading: true,
            footprints: [],
            statistics: []
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
                console.log(statistics)
                this.setState({
                    "isLoading": false,
                    "footprints" : footprints,
                    "statistics" : statistics
                })
            },
        }))
    }

    render () {

        const { isLoading } = this.state

        return(
            <div className="container dashboard-section">
                <div className="row footprints-section">
                {!isLoading ? (
                    this.state.footprints.map(footprint => (
                        <FootprintItem key={footprint.id} footprint={footprint} />
                    ))
                ):(
                    <div className="text-center">Chargement en cours...</div>
                )}
                </div>

                <div className="row statistics-section">
                    {!isLoading ? (
                    <div className="col">
                        <p>Quantité total de CO2 economisée par les utilisateurs de MakeMeGreen :</p>
                        <span><strong>{this.state.statistics.total_carbon_saved} de C0²</strong></span>
                    </div>
                    ):(
                    <div className="text-center">Chargement en cours...</div>
                    )}
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

                <div className="row progress-section">
                    <div className="col">
                        <NavLink to="/progress" className="btn btn-primary">
                            {"Mes progrès"}
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

export default compose(
    withLogin({ failRedirect: '/welcome' }),
    connect()
)(DashboardPage)
