import React, { Component } from 'react'
import { connect } from 'react-redux'

import FootprintItem from '../items/FootprintItem'
import { requestData } from '../../reducers/data'

class FootprintsPage extends Component {

  componentDidMount () {
    this.props.dispatch(requestData('GET', 'footprints'))
  }

  render() {
    const { footprints } = this.props
    return (
      <div className="footprints-page">
        ICI LA LISTE DES FOOTPRINTS
        {
          footprints.map(footprint => (
            <FootprintItem key={footprint.id} footprint={footprint} />
          ))
        }
      </div>
    );
  }
}

export default connect(
  state => ({ footprints: state.data.footprints })
)(FootprintsPage)
