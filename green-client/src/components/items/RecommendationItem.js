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
            reco_difficulty_level: null}
    }

    onSubmitedClick = () => {
        console.log("TOTO")
        this.props.dispatch(requestData('GET',`/activity/${this.state.reco_id}`))
    }

    render(){
        const { recommendation } = this.props

        const reco_id = get(recommendation, "id")
        this.state.reco_id = reco_id
        const reco_type = get(recommendation, "type")
        const reco_name = get(recommendation, "name")
        const reco_benefit = get(recommendation, "benefit")
        const reco_difficulty_level = get(recommendation, "difficulty_level")

        return (
            <tr>
                <th scope="row"> { reco_id } </th>
                <td> { reco_name } </td>
                <td> { reco_type } </td>
                <td> { reco_benefit } </td>
                <td> { reco_difficulty_level } </td>
                <td> <button onClick={e => { e.preventDefault(); this.onSubmitedClick();} }> C'est parti !</button>
                </td>
            </tr>
        )
    }

}

// export default RecommendationItem

export default connect(
)(RecommendationItem)
