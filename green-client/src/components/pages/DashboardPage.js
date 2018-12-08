import get from 'lodash.get'
import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {requestData} from "../../reducers/data";
import FootprintItem from "../items/FootprintItem";
import withLogin from "../hocs/withLogin"
import m_button from '../../assets/m_button.png'
import {THUMBS_URL} from "../../utils/config";

import { ToastContainer, toast } from 'react-toastify';
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
            <div className="text-center">

                <NavBar />

                <div className="title-header">
                    <h5>Ma semaine</h5>
                </div>

                {/*<div className="challenge-section">*/}
                    {/*Un ami vient de t'envoyer un nouveau challenge*/}
                {/*</div>*/}

                <div className="footprints-section-title">
                    {/*Cette semaine*/}
                </div>

                <div className="container">

                {!isLoading ? (
                    this.state.footprints.map(footprint => (
                        <FootprintItem key={footprint.id} footprint={footprint} />
                    ))
                ):(
                    <div className="text-center">Chargement en cours...</div>
                )}
                </div>

                <div className="leaderbord-section">
                    {!isLoading ? (
                    <div>
                        <div>
                            <img alt="" src={THUMBS_URL + "up"} className="leaderbord-avatar" />
                        </div>
                        <br />
                        <span>Score: {this.state.user_total_saved} CO2</span><br />
                        <span>Placement: <strong>{ this.state.user_rank }</strong></span>
                    </div>
                    ):(
                    <span className="text-center">Chargement en cours...</span>
                    )}
                </div>

                {/*<div className="activity-section">*/}
                    {/*{!isLoading ? (*/}
                        {/*<NavLink to="/activities" className="text-center">*/}
                        {/*{activity_count >0 ? (*/}
                            {/*<div>*/}
                                {/*<span>Vous avez { this.state.activity_count } activités en cours !</span>*/}
                            {/*</div>*/}
                        {/*):(*/}
                            {/*<span>Vous n'avez aucune activité en cours. Besoin d'une recommendations ?</span>*/}
                        {/*)}*/}
                        {/*</NavLink>*/}
                    {/*):(*/}
                        {/*<span className="text-center">Chargement en cours...</span>*/}
                    {/*)}*/}
                {/*</div>*/}

                {/*<div className="container">*/}
                {/*<div className="row">*/}
                    {/*<div className="col-6 leaderbord-section">*/}
                        {/*{!isLoading ? (*/}
                            {/*<div>*/}
                                {/*<div>*/}
                                    {/*<img alt="" src={THUMBS_URL + "up"} className="leaderbord-avatar" />*/}
                                {/*</div>*/}
                                {/*<br />*/}
                                {/*<span>Score: {this.state.user_total_saved} CO2</span><br />*/}
                                {/*<span>Placement: <strong>{ this.state.user_rank }</strong></span>*/}
                            {/*</div>*/}
                        {/*):(*/}
                            {/*<span className="text-center">Chargement en cours...</span>*/}
                        {/*)}*/}
                    {/*</div>*/}

                    {/*<div className="col-6 engine-section">*/}
                        {/*{!isLoading ? (*/}
                            {/*<div>*/}
                                {/*<div>*/}
                                    {/*<img alt="" src={THUMBS_URL + "food_color"} className="leaderbord-avatar" />*/}
                                {/*</div>*/}
                                {/*<br />*/}
                                {/*/!*<span>Envie de recommendations plus adaptées ? Aide-nous à améliorer notre algorithme !</span>*!/*/}
                                {/*<span>Découvre notre algorithme !</span>*/}
                            {/*</div>*/}
                        {/*):(*/}
                            {/*<span className="text-center">Chargement en cours...</span>*/}
                        {/*)}*/}
                    {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}

                {/*<div className="fixed-bottom discover-section">*/}
                    {/*<div className="discover-button">*/}
                        {/*<NavLink to="/propositions">*/}
                            {/*<img alt="make-me-green button"*/}
                                 {/*src={m_button}*/}
                                 {/*width="70px"*/}
                                 {/*height="70px"*/}
                            {/*/>*/}
                        {/*</NavLink>*/}
                    {/*</div>*/}
                {/*</div>*/}
                {/*<div>*/}
                    {/*<ToastContainer />*/}
                {/*</div>*/}

                {/*{this.state.showInstallMessage &&*/}
                    {/*<div>*/}
                        {/*<ToastContainer />*/}
                    {/*</div>*/}
                {/*}*/}
            </div>
        )
    }
}

export default compose(
    withLogin({ failRedirect: '/welcome' }),
    connect()
)(DashboardPage)
