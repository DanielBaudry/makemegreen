import get from 'lodash.get'
import React from 'react'

import carbon from '../../assets/carbon.jpg'
import waste from '../../assets/waste.png'
import water from '../../assets/water.png'

const FootprintItem = ({
  footprint
}) => {
    const footprint_type = get(footprint, "footprint_type")
    const footprint_value = get(footprint, "footprint_value")

    return (
      <div class="col" id="carbon-footprint">
          <div class="card">
              <div class="card-img">
                  <img class="card-img-top" src={carbon} height="150px" alt="Card image cap"/>
              </div>
              <div class="card-body">
                  <h5 class="card-title">Empreinte {footprint_type}</h5>
                  <p class="card-text">
                      <strong>  {footprint_value}  </strong>
                  </p>
                  <a href="" class="btn btn-secondary">Details</a>
              </div>
          </div>
      </div>
    )
}

export default FootprintItem
