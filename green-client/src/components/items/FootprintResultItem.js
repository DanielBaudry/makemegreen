import get from 'lodash.get'
import React from 'react'
import {THUMBS_URL} from "../../utils/config";

const FootprintResultItem = ({
                           footprint
                       }) => {
    const footprint_type = get(get(footprint, "type"), "label")
    let footprint_category = null
    let footprint_color = null
    let footprint_img = null
    switch (footprint_type) {
        case 'carbon':
            footprint_color = "car"
            footprint_category = "Sur la route"
            footprint_img = THUMBS_URL + "car"
            break;
        case 'water':
            footprint_color = "food"
            footprint_category = "Dans mon assiette"
            footprint_img = THUMBS_URL + "food"
            break;
        case 'waste':
            footprint_color = "home"
            footprint_category = "Chez moi"
            footprint_img = THUMBS_URL + "home"
            break;
    }
    const footprint_value = get(footprint, "value")

    return (
        <div className={"footprint-result-row-" + footprint_color + " media"}>
            <div className="footprint-result-row-image media-left">
                <img className="card-img" src={ footprint_img } alt="Card image cap"/>
            </div>
            <div className="footprint-result-row-value media-body">
                <strong className="footprint-result-value">  {footprint_value} </strong> kg/CO2/an
            </div>
        </div>
    )
}

export default FootprintResultItem
