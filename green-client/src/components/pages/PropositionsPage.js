import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import {requestData} from "../../reducers/data";
import withLogin from "../hocs/withLogin"
import get from "lodash.get";
import PropositionItem from "../items/PropositionItem";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import NavBar from "../items/NavBar";

import '../../styles/propositions.css'


class PropositionsPage extends Component {

    constructor (props) {
        super(props)
        this.state = { isLoading: true,
            propositions: []
        }
    }

    componentWillMount () {
        this.props.dispatch(requestData('GET', '/propositions', {
            handleSuccess: (state, action) => {
                const propositions = get(action, 'data.propositions')
                console.log(propositions)
                this.setState({
                    "isLoading": false,
                    "propositions": propositions,
                })
            },
        }))
    }

    render () {
        const { isLoading } = this.state

        return(
            <div>
                <NavBar />

                <div className="title-header">
                    <h5>Mes actions</h5>
                </div>

                <div className="container content">
                    {!isLoading || this.state.propositions.length > 0 ? (
                        <div className="propositions-section">
                            <div id="carousel" className="carousel slide" data-interval="false">
                                <div className="carousel-inner">
                                    {this.state.propositions.map(proposition => (
                                        <PropositionItem key={proposition.id}
                                                         proposition={proposition} />
                                    ))}
                                </div>
                            </div>
                            <a className="left carousel-control-prev" href="#carousel" data-slide="prev">
                                <span className="leftControl">
                                    <i className="icon icon-chevron-left"></i>
                                </span>
                            </a>
                            <a className="right carousel-control-next" href="#carousel" data-slide="next">
                                <span className="rightControl">
                                    <i className="icon icon-chevron-right"></i>
                                </span>
                            </a>
                        </div>
                    ):(
                        <div>Il semblerait qu'il n'y ait plus de nouvelles propositions pour le moment...</div>
                    )
                    }
                </div>
            </div>
        )
    }
}


export default compose(
    withLogin({ failRedirect: '/welcome' }),
    connect()
)(PropositionsPage)