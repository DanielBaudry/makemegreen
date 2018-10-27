import get from 'lodash.get'
import {requestData} from "../../reducers/data";
import React, {Component} from 'react'
import {connect} from "react-redux";


class PropositionItem extends Component {

    constructor(){
        super()
        this.state = { reco_id: null,
            reco_type: null,
            reco_name: null,
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
        const reco_name = get(proposition, "name")
        const reco_benefit = get(proposition, "benefit")
        const reco_content = get(proposition, "content")
        const reco_difficulty_level = get(proposition, "difficulty_level")
        this.setState( { "reco_id": reco_id,
                        "reco_type": reco_type,
                        "reco_name": reco_name,
                        "reco_benefit": reco_benefit,
                        "reco_content": reco_content,
                        "reco_difficulty_level": reco_difficulty_level
                    } )
    }

    render(){

        console.log(this.id)

        return (
            <div className="carousel-item reco-card">
                <div className="carousel-item-inside-div">
                    <div className="carousel-center">
                        <h5> { this.state.reco_name } </h5>
                        <h6>
                            { this.state.reco_type } -<strong>{ this.state.reco_benefit }</strong>
                        </h6>
                        <span> { this.state.reco_content } </span>
                        <div className="text-muted">Difficulté: { this.state.reco_difficulty_level } </div>
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
