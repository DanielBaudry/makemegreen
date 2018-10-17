import get from 'lodash.get'
import React from 'react'

import {THUMBS_URL} from "../../utils/config";

const FootprintItem = ({
  footprint
}) => {
    const footprint_type = get(get(footprint, "type"), "label")
    let footprint_category = null
    let footprint_img = null
    let footprint_trend = null
    switch (footprint_type) {
        case 'carbon':
            footprint_category = "Sur la route"
            footprint_img = THUMBS_URL + "car_color"
            footprint_trend = THUMBS_URL + "down"
            break;
        case 'water':
            footprint_category = "Dans mon assiette"
            footprint_img = THUMBS_URL + "food_color"
            footprint_trend = THUMBS_URL + "up"
            break;
        case 'waste':
            footprint_category = "Chez moi"
            footprint_img = THUMBS_URL + "home_color"
            footprint_trend = THUMBS_URL + "down"
            break;
    }
    const footprint_value = get(footprint, "value")

    return (
        <div className="row footprint-card">
            <div className="col">
                <img className="card-img" src={ footprint_img } alt="Card image cap"/>
            </div>
            <div className="col card-value">
                <strong>
                    { footprint_value }
                </strong>
                <span className="text-muted"> kg/CO2</span>
            </div>
            <div className="col card-trend">
                <img src={ footprint_trend } alt="Card image cap"/>
            </div>
        </div>
    )
}

export default FootprintItem
