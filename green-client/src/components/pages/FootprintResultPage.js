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
                <div className="footprint-result-title text-center">
                    <h2>Mon empreinte écologique</h2>
                </div>

                <div className="footprint-result-content">
                        {
                            footprints_data.map(footprint => (
                                <FootprintResultItem key={footprint.id} footprint={footprint} />
                            ))
                        }
                </div>
                <div className="signup-link text-center">
                    <NavLink to="/inscription" params={footprints}>
                        {"Je créé mon compte"}
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default compose(connect(
    state => ({ footprints: state.data.footprints })
))(FootPrintResultPage)