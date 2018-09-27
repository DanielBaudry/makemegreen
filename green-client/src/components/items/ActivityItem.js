import get from 'lodash.get'
import moment from 'moment'
import {requestData} from "../../reducers/data";
import React, {Component} from 'react'
import withLogin from "../hocs/withLogin";
import {connect} from "react-redux";


class ActivityItem extends Component {

    constructor(){
        super()
        this.state = { reco_id: null,
            user_id: null,
            activity_id: null,
            is_success: null,
            date_start: null,
            date_end: null,
            reco_title: null,
            reco_benefit: null}
    }

    // TODO: maybe PATCH request

    onSuccessClick = () => {
        console.log("Success")
        this.props.dispatch(requestData('GET',`/activity/validate/${this.state.activity_id}`))
    }

    onFailClick = () => {
        console.log("Fail")
        this.props.dispatch(requestData('GET',`/activity/remove/${this.state.activity_id}`))
    }

    componentDidMount () {
        const { activity } = this.props

        const reco_id = get(activity, "recommendation_id")
        const user_id = get(activity, "user_id")
        const activity_id = get(activity, "dehumanizedId")
        const is_success = get(activity, "is_success")
        const date_start = moment(get(activity, "date_start")).format('DD MMMM YYYY à HH:mm')
        const date_end = get(activity, "date_end")

        const reco_title = get(get(activity, "recommendation"),"title")
        const reco_benefit = get(get(activity, "recommendation"),"benefit")

        this.setState( { "user_id": user_id,
                        "reco_id": reco_id,
                        "activity_id": activity_id,
                        "is_success": is_success,
                        "date_start": date_start,
                        "date_end": date_end,
                        "reco_title": reco_title,
                        "reco_benefit": reco_benefit
                    } )
    }

    render(){

        return (
            <div className="col reco-card">
                <h5> { this.state.reco_title } </h5>
                <div className="card-body">
                    <div> Gain pour la planète : { this.state.reco_benefit } </div>
                    <div className="btn-group">
                        <button
                            className="btn btn-secondary"
                            onClick={e => { e.preventDefault(); this.onSuccessClick();} }>
                            C'est fait !
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={e => { e.preventDefault(); this.onFailClick();} }>
                            Impossible
                        </button>
                    </div>
                </div>
                <div class="card-footer">
                    <small class="text-muted">Débuter le : { this.state.date_start }</small>
                </div>
            </div>
        )
    }

}

export default connect(
)(ActivityItem)
