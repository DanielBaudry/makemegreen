import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import {requestData} from "../../reducers/data";
import withLogin from "../hocs/withLogin"
import RecommendationItem from "../items/RecommendationItem";
import get from "lodash.get";
import NavBar from "../items/NavBar";

class RecommendationsPage extends Component {

    constructor (props) {
        super(props)
        this.state = { isLoading: true,
                       recommendations: []
        }
    }

    componentWillMount () {
        this.props.dispatch(requestData('GET', '/recommendations', {
            handleSuccess: (state, action) => {
                const recommendations = get(action, 'data.recommendations')
                this.setState({
                    "isLoading": false,
                    "recommendations": recommendations,
                })
            },
        }))
    }

    render () {
        const { isLoading } = this.state

        return(
            <div className="text-center">

                <NavBar />

                <div className="title-header">
                    <h5>Les recommendations</h5>
                </div>

                <div className="content">
                    <div className="recommendations-section">
                        <div className="container">
                            <div className="row justify-content-md-center">
                                {!isLoading ? (
                                        this.state.recommendations.map(recommendation => (
                                            <RecommendationItem key={recommendation.id} recommendation={recommendation} />
                                ))
                                ):(
                                    <div>Chargement en cours...</div>
                                )
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default compose(
    withLogin({ failRedirect: '/welcome' }),
    connect()
)(RecommendationsPage)