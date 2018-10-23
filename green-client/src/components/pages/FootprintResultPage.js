import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { NavLink } from 'react-router-dom'
import FootprintResultItem from "../items/FootprintResultItem";



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
                <div className="py-5 text-center">
                    <h2>Ton empreinte écologique</h2>
                    <p className="lead">Résultats</p>
                </div>

                <div className="container">
                    <div className="row">
                        {
                            footprints_data.map(footprint => (
                                <FootprintResultItem key={footprint.id} footprint={footprint} />
                            ))
                        }
                    </div>
                </div>
                <div className="my-5 pt-5 text-center">
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

export default compose(connect(
    state => ({ footprints: state.data.footprints })
))(FootPrintResultPage)