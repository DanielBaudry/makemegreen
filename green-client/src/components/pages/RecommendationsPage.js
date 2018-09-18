import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {requestData} from "../../reducers/data";
import withLogin from "../hocs/withLogin"
import RecommendationItem from "../items/RecommendationItem";

class RecommendationsPage extends Component {


    constructor () {
        super()
        this.state = { name: null,
                       content: null,
                       benefit: null,
                       type: null,
                       difficulty_level: null}
    }

    componentDidMount () {
        this.props.dispatch(requestData('GET', 'recommendations'))
    }

    render () {
        let reco = []

        const { recommendations } = this.props
        if( recommendations && recommendations.length > 0){
            reco = recommendations[0]['recommendations']
        }


        return(
            <div class="text-center">
                Recommendations
                <div className="recommendations-section">
                    <div class="container">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Benefit</th>
                                    <th>Content</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reco.map(recommendation => (
                                        <RecommendationItem key={recommendation.id} recommendation={recommendation} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="my-5 pt-5 text-center">
                    <NavLink to="/recommendation" className="button btn-primary btn-lg active">
                        {"Ajouter ma recommandation"}
                    </NavLink>
                </div>
                <div class="my-5 pt-5 text-center">
                    <NavLink to="/home" className="button btn-primary btn-lg active">
                        {"Retour au tableau de bord"}
                    </NavLink>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ recommendations: state.data.recommendations})

export default compose(
    withLogin({ failRedirect: '/welcome' }),
    connect(mapStateToProps)
)(RecommendationsPage)