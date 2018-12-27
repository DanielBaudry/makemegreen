import get from 'lodash.get'
import {requestData} from "../../reducers/data";
import React, {Component} from 'react'
import {connect} from "react-redux";
import {THUMBS_URL} from "../../utils/config";


class PropositionItem extends Component {

    constructor(){
        super()
        this.state = { reco_id: null,
            reco_type: null,
            reco_title: null,
            reco_benefit: null,
            reco_content: null,
            reco_difficulty_level: null}
    }

    onSubmitedClick = () => {
        this.props.dispatch(requestData('GET',`/activity/${this.state.reco_id}`))
    }

    componentDidMount () {
        const { proposition } = this.props

        const reco_id = get(proposition, "id")
        const reco_type = get(get(proposition, "type"),"label")
        const reco_title = get(proposition, "title")
        const reco_benefit = get(proposition, "benefit")
        const reco_content = get(proposition, "content")
        const reco_difficulty_level = get(proposition, "difficulty_level")
        const reco_first = get(proposition, "first")

        this.setState( { "reco_id": reco_id,
                        "reco_type": reco_type,
                        "reco_title": reco_title,
                        "reco_benefit": reco_benefit,
                        "reco_content": reco_content,
                        "reco_difficulty_level": reco_difficulty_level,
                        "reco_first": reco_first,
                    } )
    }

    render(){

        let reco_category = null
        let reco_img = null

        if ( this.state && this.state.reco_type){
            switch (this.state.reco_type) {
                case 'carbon':
                    reco_category = "Sur la route"
                    reco_img = THUMBS_URL + "car_color"
                    break;
                case 'water':
                    reco_category = "Dans mon assiette"
                    reco_img = THUMBS_URL + "food_color"
                    break;
                case 'waste':
                    reco_category = "Chez moi"
                    reco_img = THUMBS_URL + "home_color"
                    break;
            }
        }

        let class_name = "carousel-item reco-card"
        if (this.state && this.state.reco_first){
            class_name += " active"
        }

        return (
            <div className={ class_name }>
                <div className="carousel-item-inside-div">
                    <div className="carousel-center">
                        <img className="card-img" src={ reco_img } alt="Card image cap"/>
                        <div>
                            <strong className="footprint-result-value">
                                {this.state.reco_benefit}
                            </strong> kg/CO2/an
                        </div>
                        <div className="reco-title">
                            { this.state.reco_title }
                        </div>
                        <div className="reco-content">
                            { this.state.reco_content }
                        </div>
                        <div className="text-muted">
                            Difficulté: { this.state.reco_difficulty_level }
                        </div>
                    </div>
                    <div className="carousel-caption">
                        <button
                            className="btn btn-secondary"
                            onClick={e => { e.preventDefault(); this.onSubmitedClick();} }>
                            C'est parti !
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}

export default connect()(PropositionItem)
