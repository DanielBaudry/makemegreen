import get from 'lodash.get'
import React from 'react'

const FootprintResultItem = ({
                           footprint
                       }) => {
    const footprint_type = get(get(footprint, "type"), "label")
    let footprint_category = null
    switch (footprint_type) {
        case 'carbon':
            footprint_category = "Sur la route"
            break;
        case 'water':
            footprint_category = "Dans mon assiette"
            break;
        case 'waste':
            footprint_category = "Chez moi"
            break;
    }
    const footprint_value = get(footprint, "value")
    console.log("FootprintItem")

    return (
        <div className="col">
            <div className="card footprint-card">
                <div className="card-body">
                    <span className="card-title">{footprint_category}</span>
                    <p className="card-text">
                        <strong>  {footprint_value}  </strong>
                    </p>
                    <div className="card-details">
                        <a href="/home" className="btn btn-secondary">Details</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FootprintResultItem