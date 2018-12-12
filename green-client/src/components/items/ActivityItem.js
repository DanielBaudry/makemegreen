import get from 'lodash.get'
import moment from 'moment'
import {requestData} from "../../reducers/data";
import React, {Component} from 'react'
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
            status: null,
            reco_title: null,
            reco_benefit: null,
            reco_type: null}
    }

    // TODO: maybe PATCH request

    onSuccessClick = () => {
        this.props.dispatch(requestData('GET',`/activity/validate/${this.state.activity_id}`,
            {
                handleSuccess: (state, action) => {
                    const status = "success"
                    this.setState({
                        "status": status,
                        "date_end": moment().format('DD MMMM YYYY à HH:mm')
                    })
                    console.log(this.state.status)
                },
            }))
    }

    onFailClick = () => {
        this.props.dispatch(requestData('GET',`/activity/remove/${this.state.activity_id}`,
            {
                handleSuccess: () => {
                    this.setState( {
                        "status": "fail",
                        "date_end": moment().format('DD MMMM YYYY à HH:mm')
                    })
                },
            }))
    }

    onHoldClick = () => {
        this.props.dispatch(requestData('GET',`/activity/hold/${this.state.activity_id}`,
            {
                handleSuccess: (state, action) => {
                    this.setState( {
                        "status": "pending",
                        "date_end": moment().format('DD MMMM YYYY à HH:mm')
                    })
                    console.log(this.state.status)
                },
            }))
    }

    componentDidMount () {
        const { activity } = this.props

        const reco_id = get(activity, "recommendation_id")
        const user_id = get(activity, "user_id")
        const activity_id = get(activity, "id")
        const is_success = get(activity, "is_success")
        const date_start = moment(get(activity, "date_start")).format('DD MMMM YYYY à HH:mm')
        const date_end = moment(get(activity, "date_end")).format('DD MMMM YYYY à HH:mm')
        const status = get(get(activity, "status"),"label")
        const reco_title = get(get(activity, "recommendation"),"title")
        const reco_benefit = get(get(activity, "recommendation"),"benefit")
        const reco_type = get(get(get(activity, "recommendation"),"type"),"label")


        this.setState( { "user_id": user_id,
                        "reco_id": reco_id,
                        "activity_id": activity_id,
                        "is_success": is_success,
                        "date_start": date_start,
                        "date_end": date_end,
                        "status" : status,
                        "reco_title": reco_title,
                        "reco_benefit": reco_benefit,
                        "reco_type": reco_type,
                    } )
    }

    render(){

        return (
            <div className="dashboard-card">
                <div className={"activity-title " + this.state.reco_type }>
                        { this.state.reco_title }
                </div>
                <div className="text-center">
                    <h6 className="text-muted">
                        { this.state.status }
                    </h6>
                </div>
                    { this.state.status == "pending" ? (
                        <div className="text-center">
                            <div className="btn-group">
                                <button
                                    className="btn"
                                    onClick={e => { e.preventDefault(); this.onSuccessClick();} }>
                                    C'est fait !
                                </button>
                                <button
                                    className="btn"
                                    onClick={e => { e.preventDefault(); this.onFailClick();} }>
                                    Plus intéressé
                                </button>
                            </div>
                        </div>
                    ) : (
                    <div className="text-center">
                        <div className="date-end">
                            Terminé le : { this.state.date_end }
                        </div>
                        <div className="date-end">
                            <button
                                className="btn"
                                onClick={e => { e.preventDefault(); this.onHoldClick();} }>
                                J'ai changé
                            </button>
                        </div>
                    </div>
                    )}
            </div>
        )
    }

}

export default connect()(ActivityItem)
