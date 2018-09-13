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
        this.state = { footprints: null,
            leaderbord: null,
            statistics: null
        }
    }

    onSignOutClick = () => {
        const { history } = this.props
        this.props.dispatch(requestData('GET', 'users/signout', {
            handleSuccess: () => {
                history.push('/connexion')
            },
        }))
    }

    componentDidMount () {
        this.props.dispatch(requestData('GET', 'dashboard'))
    }

    render () {
        let footprints = []
        let leaderbord = []
        let statistics = []

        const { dashboard } = this.props
        if( dashboard.length > 0){
            footprints = dashboard[0]['footprints']
            leaderbord = dashboard[0]['leaderbord']
            statistics = dashboard[0]['statistics']
        }


        return(
            <div class="text-center">
                Dashboard
                <div className="footprints-section">
                    ICI LE RESUME DES FOOTPRINTS
                    <div class="container">
                        <div class="row" id ="results">
                        {
                            footprints.map(footprint => (
                                <FootprintItem key={footprint.id} footprint={footprint} />
                            ))
                        }
                        </div>
                    </div>
                </div>
                <div className="leaderbord-section">
                    <p>ICI LE CLASSEMENT</p>
                    Rang : {leaderbord.rank}
                </div>

                <div className="statistics-section">
                    <p>ICI LES STATISTIQUES</p>
                    <p>Quantité total de CO2 economisée par les utilisateurs de MakeMeGreen :</p>
                    <span><strong>{statistics.total_carbon_saved} de C0²</strong></span>
                </div>

                <div>
                    <button
                        type="button"
                        className="navlink flex-columns"
                        onClick={this.onSignOutClick}>
                        <span>
                        Déconnexion
                        </span>
                    </button>
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

export default connect(
    state => ({ dashboard: state.data.dashboard})
)(DashboardPage)
