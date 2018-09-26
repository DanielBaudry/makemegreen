import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import FootprintItem from '../items/FootprintItem'


class FootPrintResultPage extends Component {

    constructor (props) {
        super(props)
    }

    render () {
        const { footprints } = this.props

        let footprints_data = []
        if ( footprints.length > 0 ){
            footprints_data = this.props.footprints[0]['footprints']
        }

        return(
            <div className={`footprint-result`}>
                <div class="py-5 text-center">
                    <h2>Ton empreinte écologique</h2>
                    <p class="lead">Résultats</p>
                </div>

                <div class="container">
                    <div class="row">
                        {
                            footprints_data.map(footprint => (
                                <FootprintItem key={footprint.id} footprint={footprint} />
                            ))
                        }
                    </div>
                </div>
                <div class="my-5 pt-5 text-center">
                    <NavLink to="/connexion" className="btn btn-primary btn-lg">
                        {"Connexion"}
                    </NavLink>
                    <NavLink to="/inscription" params={footprints} className="btn btn-primary btn-lg">
                        {"Inscription"}
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ footprints: state.data.footprints })
)(FootPrintResultPage)