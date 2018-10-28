import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {requestData} from "../../reducers/data";
import withLogin from "../hocs/withLogin"
import Highcharts from "highcharts"
import moment from 'moment'
import get from "lodash.get";
import avatar from '../../assets/avatar.svg'

class ProgressPage extends Component {


    constructor () {
        super()
        this.state = { isLoading: true,
            "history": []
        }
    }

    componentWillMount () {

        this.props.dispatch(requestData('GET', '/footprints', {
            handleSuccess: (state, action) => {
                const history = get(action, 'data.footprints')
                console.log("history: ", history)
                this.setState({
                    "isLoading": false,
                    "history" : history
                })

                let series_carbon = []
                let series_water = []
                let series_waste = []
                history.map(footprints => (
                    footprints.map(footprint => {
                            console.log(footprint)
                            if (get(get(footprint, 'type'), 'label') == "carbon") {
                                series_carbon.push([moment(get(footprint, 'date_created')).valueOf(), get(footprint, 'value')])
                            }
                            if (get(get(footprint, 'type'), 'label') == "waste") {
                                series_waste.push([moment(get(footprint, 'date_created')).valueOf(), get(footprint, 'value')])
                            }
                            if (get(get(footprint, 'type'), 'label') == "water") {
                                series_water.push([moment(get(footprint, 'date_created')).valueOf   (), get(footprint, 'value')])
                            }
                        }))
                )
                console.log(series_carbon)
                console.log(series_waste)
                console.log(series_water)

                Highcharts.chart('container', {

                    title: {
                        text: 'Evolution de mes empreintes écologiques'
                    },

                    subtitle: {
                        text: 'makemegreen.fr'
                    },
                    xAxis: {
                        type: 'datetime',
                        labels: {
                            format: '{value:%Y-%b-%e}'
                        },
                        dateTimeLabelFormats: {
                            day: "%e. %b",
                            month: "%b '%y",
                            year: "%Y"
                        },
                        tickInterval: 3600000,
                    },
                    yAxis: {
                        title: {
                            text: 'Kg de CO²'
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },
                    series: [{
                        name: 'carbon',
                        data: series_carbon
                    }, {
                        name: 'waste',
                        data: series_waste
                    }, {
                        name: 'water',
                        data: series_water
                    }],

                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }]
                    }

                });
            },
            key: "history"
        }))

    }

    render () {

        const { user } = this.props

        return(
            <div className="text-center">
                <div className="header-menu">
                    <nav className="navbar navbar-dark">
                        <NavLink className="navbar-brand" to="/home">
                            <span>
                                <img alt="" src={avatar} className="navbar-avatar" />
                            </span>
                            <span>
                            {user && user.username}
                            </span>
                        </NavLink>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <NavLink to="/home" className="nav-link">
                                        {"Home"}
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/recommendations" className="nav-link">
                                        {"Recommandations"}
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/activities" className="nav-link">
                                        {"Mon activité"}
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/progress" className="nav-link">
                                        {"Mes progrès"}
                                    </NavLink>
                                </li>
                                <li>
                                    <a
                                        className="nav-link"
                                        onClick={this.onSignOutClick}>
                                        Déconnexion
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                My progresses
                <div className="progress-section">
                    <div id="container"></div>
                </div>
            </div>
        )
    }
}


export default compose(
    withLogin({ failRedirect: '/welcome' }),
    connect()
)(ProgressPage)