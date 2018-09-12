import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import FootprintItem from '../items/FootprintItem'


class FootPrintResultPage extends Component {

    constructor (props) {
        super(props)
    }

    render () {
        // const { footprints } = this.props
        const footprints = this.props.footprints[0]['footprints']

        return(
            <div className={`footprint-result`}>
                <div class="py-5 text-center">
                    <h2>Ton empreinte écologique</h2>
                    <p class="lead">Résultats</p>
                </div>

                <div class="container">
                    <div class="row" id ="results">
                        {
                            footprints.map(footprint => (
                                <FootprintItem key={footprint.id} footprint={footprint} />
                            ))
                        }
                    </div>
                </div>
                <div class="my-5 pt-5 text-center">
                        <NavLink to="/connexion" className="button btn-primary btn-lg active">
                        {"Connexion"}
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ footprints: state.data.footprints })
)(FootPrintResultPage)