import get from 'lodash.get'
import {requestData} from "../../reducers/data";
import React, {Component} from 'react'
import withLogin from "../hocs/withLogin";
import {connect} from "react-redux";


class RecommendationItem extends Component {

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
        console.log("TOTO")
        this.props.dispatch(requestData('GET',`/activity/${this.state.reco_id}`))
    }

    componentDidMount () {
        const { recommendation } = this.props

        const reco_id = get(recommendation, "id")
        const reco_type = get(recommendation, "type")
        const reco_name = get(recommendation, "name")
        const reco_benefit = get(recommendation, "benefit")
        const reco_content = get(recommendation, "content")
        const reco_difficulty_level = get(recommendation, "difficulty_level")
        this.setState( { "reco_id": reco_id,
                        "reco_type": reco_type,
                        "reco_name": reco_name,
                        "reco_benefit": reco_benefit,
                        "reco_content": reco_content,
                        "reco_difficulty_level": reco_difficulty_level
                    } )
    }

    render(){

        return (
            <tr>
                <th scope="row"> { this.state.reco_id } </th>
                <td> { this.state.reco_name } </td>
                <td> { this.state.reco_type } </td>
                <td> { this.state.reco_benefit } </td>
                <td> { this.state.reco_content } </td>
                <td> { this.state.reco_difficulty_level } </td>
                <td> <button onClick={e => { e.preventDefault(); this.onSubmitedClick();} }> C'est parti !</button>
                </td>
            </tr>
        )
    }

}

// export default RecommendationItem

export default connect(
)(RecommendationItem)
