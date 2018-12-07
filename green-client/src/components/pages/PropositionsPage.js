import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {requestData} from "../../reducers/data";
import withLogin from "../hocs/withLogin"
import get from "lodash.get";
import avatar from '../../assets/avatar.svg'
import PropositionItem from "../items/PropositionItem";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import NavBar from "../items/NavBar";

class PropositionsPage extends Component {

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
        const { user } = this.props

        return(
            <div className="text-center">

                <NavBar user={user}/>

                Propositions
                <div className="propositions-section" style={{height: '100%'}}>

                    <div id="carousel" className="carousel slide" data-interval="false">
                        <div className="carousel-inner">
                            {/*<div className="carousel-item active">*/}
                                {/*<div className="carousel-item-inside-div">*/}
                                    {/*<div className="carousel-center">*/}
                                        {/*<div>Voici la liste des recommedations que nous avons sélectionnées pour vous !</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="carousel-center"></div>*/}
                                    {/*<div className="carousel-caption">Tutoriel</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {!isLoading ? (
                                this.state.propositions.map(proposition => (
                                    <PropositionItem key={proposition.id}
                                                     proposition={proposition} />
                                ))
                            ):(
                                <div>Chargement en cours...</div>
                            )
                            }
                        </div>
                        <div>
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
                    </div>

                </div>
            </div>
        )
    }
}


export default compose(
    withLogin({ failRedirect: '/welcome' }),
    connect()
)(PropositionsPage)