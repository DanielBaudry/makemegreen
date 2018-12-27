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
import {NavLink} from "react-router-dom";

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

    render () {
        const { isLoading } = this.state

        return(
            <div>

                <NavBar />

                <div className="title-header">
                    <h5>
                        Ma progression
                    </h5>
                </div>

                <div className="container content">

                    <div className="dashboard-card">
                        <div className="dashboard-card-title">
                            Mon empreinte globale
                        </div>
                        <div className="dashboard-card-content">
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
                                        <li>
                                            <NavLink to="/activities">
                                                <strong>{this.state.activity_count}</strong> activités
                                            </NavLink>
                                        </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ):(
                            <span>Chargement en cours...</span>
                        )}
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <div className="dashboard-card-title">
                            Ma semaine
                        </div>
                        <div className="dashboard-card-content">
                        {!isLoading ? (
                            this.state.footprints.map(footprint => (
                                <FootprintItem key={footprint.id} footprint={footprint} />
                            ))
                        ):(
                            <div>Chargement en cours...</div>
                        )}
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <div className="dashboard-card-title">
                            Ma communauté
                        </div>
                        <div className="dashboard-card-content">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-5">
                                            <div className="contact-footprint">
                                                <img className="contact-image" src={ contact } alt="Contact"/>
                                                <span>Anne</span>
                                            </div>
                                        </div>
                                        <div className="col contact-footprint">
                                            <span>
                                                <strong>
                                                    1<sup>er</sup>
                                                </strong>
                                            </span>
                                        </div>
                                        <div className="col">
                                            <div className="contact-footprint text-right">
                                                <span className="contact-footprint-value">0,98</span>
                                                <img className="contact-image" src={ earth } alt="Contact"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contact-reco-title">
                                        <em>
                                            Je débranche ma box quand je ne suis pas à la maison
                                        </em>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-5">
                                            <div className="contact-footprint">
                                                <img className="contact-image" src={ contact } alt="Contact"/>
                                                <span>Jérémy</span>
                                            </div>
                                        </div>
                                        <div className="col contact-footprint">
                                            <span>
                                                <strong>
                                                    2<sup>ème</sup>
                                                </strong>
                                            </span>
                                        </div>
                                        <div className="col">
                                            <div className="contact-footprint text-right">
                                                <span className="contact-footprint-value">1,34</span>
                                                <img className="contact-image" src={ earth } alt="Contact"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contact-reco-title">
                                        <em>
                                            J'évite la voiture et je prends les transports en commun
                                        </em>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-5">
                                            <div className="contact-footprint">
                                                <img className="contact-image" src={ contact } alt="Contact"/>
                                                <span>Clément</span>
                                            </div>
                                        </div>
                                        <div className="col contact-footprint">
                                            <span>
                                                <strong>
                                                    3<sup>ème</sup>
                                                </strong>
                                            </span>
                                        </div>
                                        <div className="col">
                                            <div className="contact-footprint text-right">
                                                <span className="contact-footprint-value">0,71</span>
                                                <img className="contact-image" src={ earth } alt="Contact"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contact-reco-title">
                                        <em>
                                            Je pense à éteindre mon frigo pendant mes vacances prolongées
                                        </em>
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
