import get from 'lodash.get'
import React from 'react'


import details from '../../assets/details.png'
import {THUMBS_URL} from "../../utils/config";
import {NavLink} from "react-router-dom";

const FootprintItem = ({
  footprint
}) => {
    const footprint_type = get(get(footprint, "type"), "label")
    let footprint_category = null
    let footprint_img = null
    let footprint_trend = null
    let footprint_color = null
    switch (footprint_type) {
        case 'carbon':
            footprint_color = "car"
            footprint_category = "Sur la route"
            footprint_img = THUMBS_URL + "car_filled_color"
            footprint_trend = THUMBS_URL + "down"
            break;
        case 'water':
            footprint_color = "food"
            footprint_category = "Dans mon assiette"
            footprint_img = THUMBS_URL + "food_filled_color"
            footprint_trend = THUMBS_URL + "up"
            break;
        case 'waste':
            footprint_color = "home"
            footprint_category = "Chez moi"
            footprint_img = THUMBS_URL + "home_filled_color"
            footprint_trend = THUMBS_URL + "down"
            break;
    }
    let footprint_value = get(footprint, "value")
    if (footprint_value != 0){
        footprint_value = '- ' + footprint_value
    }

    return (

        <div className={"footprint-row-" + footprint_color + " media"}>
            <div className="footprint-row-image media-left">
                <img className="card-img" src={ footprint_img } alt="Card image cap"/>
            </div>
            <div className="footprint-row-value media-body">
                <strong className="footprint-result-value"> { footprint_value } </strong> kg/CO2/an
            </div>
            <div className="footprint-row-trend media-right">
                <NavLink to={"/details?" + footprint_type }>
                    <img className="details-img" src={ details } alt="go to details"/>
                </NavLink>
            </div>
        </div>
    )
}

export default FootprintItem
