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
    let footprint_color = null
    switch (footprint_type) {
        case 'carbon':
            footprint_color = "car"
            footprint_category = "Sur la route"
            footprint_img = THUMBS_URL + "car"
            footprint_trend = THUMBS_URL + "down"
            break;
        case 'water':
            footprint_color = "food"
            footprint_category = "Dans mon assiette"
            footprint_img = THUMBS_URL + "food"
            footprint_trend = THUMBS_URL + "up"
            break;
        case 'waste':
            footprint_color = "home"
            footprint_category = "Chez moi"
            footprint_img = THUMBS_URL + "home"
            footprint_trend = THUMBS_URL + "down"
            break;
    }
    const footprint_value = get(footprint, "value")

    return (

        <div className={"footprint-row-" + footprint_color + " media"}>
            <div className="footprint-row-image media-left">
                <img className="card-img" src={ footprint_img } alt="Card image cap"/>
            </div>
            <div className="footprint-row-value media-body">
                <strong className="footprint-result-value">  {footprint_value} </strong> kg/CO2/an
            </div>
            <div className="footprint-row-trend media-right">
                <img src={ footprint_trend } alt="Card image cap"/>
            </div>
        {/*<div className="row footprint-card">*/}
            {/*<div className="col">*/}
                {/*<img className="card-img" src={ footprint_img } alt="Card image cap"/>*/}
            {/*</div>*/}
            {/*<div className="col card-value">*/}
                {/*<strong>*/}
                    {/*{ footprint_value }*/}
                {/*</strong>*/}
                {/*<span className="text-muted"> kg/CO2</span>*/}
            {/*</div>*/}
            {/*<div className="col card-trend">*/}
                {/*<img src={ footprint_trend } alt="Card image cap"/>*/}
            {/*</div>*/}
        {/*</div>*/}
        </div>
    )
}

export default FootprintItem
