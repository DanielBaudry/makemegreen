import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import {requestData} from "../../reducers/data";
import withLogin from "../hocs/withLogin"
import RecommendationItem from "../items/RecommendationItem";
import get from "lodash.get";

class RecommendationsPage extends Component {

    onSignOutClick = () => {
        const { history } = this.props
        this.props.dispatch(requestData('GET', '/users/signout', {
            handleSuccess: () => {
                history.push('/connexion')
            },
        }))
    }

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

                Recommendations
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
                {/*<div className="my-5 pt-5 text-center">*/}
                    {/*<NavLink to="/recommendation" className="btn btn-primary">*/}
                        {/*{"Ajouter ma recommandation"}*/}
                    {/*</NavLink>*/}
                {/*</div>*/}
            </div>
        )
    }
}


export default compose(
    withLogin({ failRedirect: '/welcome' }),
    connect()
)(RecommendationsPage)