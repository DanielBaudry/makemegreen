import React, { Component } from 'react';
import {requestData} from "../../reducers/data";
import { connect } from 'react-redux'

import FootprintItem from '../items/FootprintItem'


class FootPrintResultPage extends Component {

    constructor (props) {
        super(props)
    }

    // componentDidMount () {
    //     this.props.dispatch(this.state.data)
    // }

    render () {
        const { footprints } = this.props
        return(
            <div className={`footprint-result`}>
                <div>
                    Test
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
)(FootPrintResultPage)