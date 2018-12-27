import get from 'lodash.get'
import {requestData} from "../../reducers/data";
import React, {Component} from 'react'
import withLogin from "../hocs/withLogin";
import {connect} from "react-redux";
import {THUMBS_URL} from "../../utils/config";


class RecommendationItem extends Component {

    constructor(){
        super()
        this.state = { reco_id: null,
            reco_type: null,
            reco_name: null,
            reco_benefit: null,
            reco_content: null,
            reco_difficulty_level: null,
            reco_img: null}
    }

    onSubmitedClick = () => {
        this.props.dispatch(requestData('GET',`/activity/${this.state.reco_id}`))
    }

    componentDidMount () {
        const { recommendation } = this.props

        const reco_id = get(recommendation, "id")
        const reco_type = get(get(recommendation, "type"),"label")
        const reco_name = get(recommendation, "name")
        const reco_benefit = get(recommendation, "benefit")
        const reco_content = get(recommendation, "content")
        const reco_difficulty_level = get(recommendation, "difficulty_level")
        let reco_img = null
        switch (reco_type) {
            case 'carbon':
                reco_img = THUMBS_URL + "car"
                break;
            case 'water':
                reco_img = THUMBS_URL + "food"
                break;
            case 'waste':
                reco_img = THUMBS_URL + "home"
                break;
        }
        this.setState( { "reco_id": reco_id,
            "reco_type": reco_type,
            "reco_name": reco_name,
            "reco_benefit": reco_benefit,
            "reco_content": reco_content,
            "reco_difficulty_level": reco_difficulty_level,
            "reco_img": reco_img
        } )

    }

    render(){

        return (
            <div className="col-md-3 reco-card">
                <img src={ this.state.reco_img } alt="Card image cap"/>
                <h5> { this.state.reco_title } </h5>
                <h6>
                    { this.state.reco_type } -<strong>{ this.state.reco_benefit }</strong>
                </h6>
                <span> { this.state.reco_content } </span>
                <div className="text-muted">Difficulté: { this.state.reco_difficulty_level } </div>
                <button
                    className="btn btn-secondary"
                    onClick={e => { e.preventDefault(); this.onSubmitedClick();} }>
                    C'est parti !
                </button>
            </div>
        )
    }

}

export default connect()(RecommendationItem)
