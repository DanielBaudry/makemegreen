import get from 'lodash.get'
import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import {requestData} from "../../reducers/data";
import FootprintItem from "../items/FootprintItem";
import withLogin from "../hocs/withLogin"
import contact from '../../assets/contact.png'
import earth from '../../assets/earth.png'

import 'react-toastify/dist/ReactToastify.min.css';

import '../../styles/dashboard.css'
import NavBar from "../items/NavBar";

class DashboardPage extends Component {

    constructor (props) {
        super(props)
        this.state = { isLoading: true,
            footprints: [],
            statistics: [],
            activity_count: 0,
            user_total_saved: 0,
            user_rank: "0/0",
            showInstallMessage: false
        }
    }

    onSignOutClick = () => {
        const { history } = this.props
        this.props.dispatch(requestData('GET', '/users/signout', {
            handleSuccess: () => {
                history.push('/connexion')
            },
        }))
    }

    componentWillMount () {
        this.props.dispatch(requestData('GET', '/dashboard', {
            handleSuccess: (state, action) => {
                const footprints = get(action, 'data.weekly_progress')
                const statistics = get(action, 'data.statistics')
                const activity_count = get(get(action, 'data.activities'),'activity_count')
                const user_rank = get(get(action, 'data.leaderbord'),'rank')
                const user_total_saved = get(get(action, 'data.statistics'),'user_total_saved')
                this.setState({
                    "activity_count": activity_count,
                    "isLoading": false,
                    "footprints" : footprints,
                    "statistics" : statistics,
                    "user_rank" : user_rank,
                    "user_total_saved" : user_total_saved,
                })
            },
        }))
    }

    // notify () {
    //     toast.info("Tu peux installer l'application sur ton iphone : en appuyant sur partages et \"sur l'écra d'accueil\".", {
    //         position: toast.POSITION.BOTTOM_CENTER
    //     });
    // }

    // componentDidMount () {
    //     // Detects if device is on iOS
    //     const isIos = () => {
    //         const userAgent = window.navigator.userAgent.toLowerCase();
    //         return /iphone|ipad|ipod/.test( userAgent );
    //     }
    //     // Detects if device is in standalone mode
    //     const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
    //
    //     // Checks if should display install popup notification:
    //     if (isIos() && !isInStandaloneMode()) {
    //         this.setState({ showInstallMessage: true });
    //         this.notify()
    //     }
    //
    //     // TODO: manage same things for Android
    // }

    render () {
        const { isLoading } = this.state

        return(
            <div>

                <NavBar />

                <div className="title-header text-center">
                    <h5>Ma semaine</h5>
                </div>

                <div className="container content">

                    <div>
                        <div className="earth-consumption-title">
                            Mon empreinte globale
                        </div>
                        {!isLoading ? (
                            <div className="row">
                                <div className="col">
                                    <div className="earth-consumption text-center">
                                        <span>1.23</span>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="overall-consumption">
                                        <ul>
                                        <li><strong>{this.state.user_total_saved}</strong> kgCO2/an</li>
                                        <li><strong>32%</strong> de diminution</li>
                                        <li><strong>{this.state.activity_count}</strong> activités</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ):(
                            <span>Chargement en cours...</span>
                        )}
                    </div>

                    <div className="earth-consumption-title">
                        Ma semaine
                    </div>
                    <div>
                        {!isLoading ? (
                            this.state.footprints.map(footprint => (
                                <FootprintItem key={footprint.id} footprint={footprint} />
                            ))
                        ):(
                            <div>Chargement en cours...</div>
                        )}
                    </div>

                    <div className="earth-consumption-title">
                        Ma communauté
                    </div>

                    <div>
                        <div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col text-center">
                                            <img className="contact-image" src={ contact } alt="Contact"/>
                                            <div>Anne</div>
                                        </div>
                                        <div className="col text-center">
                                            <div className="contact-footprint">
                                                <span className="contact-footprint-value">0,98</span>
                                                <img className="contact-image" src={ earth } alt="Contact"/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div>Dernière activitié :</div>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col text-center">
                                            <img className="contact-image" src={ contact } alt="Contact"/>
                                            <div>Jérémy</div>
                                        </div>
                                        <div className="col text-center">
                                            <div className="contact-footprint">
                                                <span className="contact-footprint-value">1,34</span>
                                                <img className="contact-image" src={ earth } alt="Contact"/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div>Dernière activitié :</div>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col text-center">
                                            <img className="contact-image" src={ contact } alt="Contact"/>
                                            <div>Clément</div>
                                        </div>
                                        <div className="col text-center">
                                            <div className="contact-footprint">
                                                <span className="contact-footprint-value">0,71</span>
                                                <img className="contact-image" src={ earth } alt="Contact"/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div>Dernière activitié :</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
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
)(DashboardPage)
