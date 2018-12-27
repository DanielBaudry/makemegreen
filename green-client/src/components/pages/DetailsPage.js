import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import withLogin from "../hocs/withLogin"
import back from '../../assets/back.png'
import NavBar from "../items/NavBar";
import {Doughnut} from 'react-chartjs-2';
import '../../styles/details.css'
import {requestData} from "../../reducers/data";
import get from "lodash.get";

class DetailsPage extends Component {


    constructor () {
        super()
        this.state = { isLoading: true }
    }

    componentWillMount () {


    }

    onSelectChangeIs(param) {
        console.log(param);
        this.props.dispatch(requestData('POST', 'profile',{
            body: param,
            handleSuccess: (action ,state) => {
                console.log(action)
            }
        }))
    }

    render () {
        const { history } = this.props

        const data = {
            labels: [
                'Ménage',
                'Bain & Douche',
                'Vaisselle'
            ],
            datasets: [{
                data: [30, 50, 20],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        };

        return(
            <div>
                <NavBar />

                <div className="title-header">
                    <div className="back-div"
                         onClick={() => history.go(-1)}>
                        <img className="details-img"
                             src={ back }
                             alt="go to previous page"/>
                    </div>
                    <h5>
                        Détails
                    </h5>
                </div>

                <div className="container content">
                    <div className="dashboard-card">
                        <div className="dashboard-card-title">
                            Répartition
                        </div>
                        <div className="dashboard-card-content">
                            <div className="details-chart">
                                <Doughnut data={data} />
                            </div>

                            <div className="details-list">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col text-left">
                                                Bain & Douche
                                            </div>
                                            <div className="col text-right">50%</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col text-left">
                                                Ménage
                                            </div>
                                            <div className="col text-right">30%</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col text-left">
                                                Vaisselle
                                            </div>
                                            <div className="col text-right">20%</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <div className="dashboard-card-title">
                            Précision
                        </div>
                        <div className="dashboard-card-content text-justify">
                            <span>Vous trouvez que ces chiffres sont trop loin de la réalité ?
                            Voici quelques questions pour nous aider à être plus précis :</span>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <div className="dashboard-card-content">
                            <div className="form-group">
                                <label htmlFor="question">
                                    Combien de douches ou bains prenez-vous par semaines ?
                                </label>
                                {/* TODO: use toast, so the question fade 3seconds after you answered it
                                Or it can also fade an reappear with a new question
                                 until no more questions are available
                                */}
                                <select id="question"
                                    className="custom-select"
                                    onChange={(e) => {
                                        const value = e.target.value
                                        this.onSelectChangeIs(value)
                                    }}>
                                    <option/>
                                    <option value="0">jamais</option>
                                    <option value="1">1 à 2 fois par semaine</option>
                                    <option value="3">3 à 5 fois par semaine</option>
                                    <option value="5">5 à 7 fois par semaine</option>
                                    <option value="7">à chaque repas</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <div className="dashboard-card-content">
                            <div className="form-group">
                                <label htmlFor="question_2">
                                    Possèdez-vous une piscine ?
                                </label>
                                <select id="question_2"
                                        className="custom-select">
                                    <option/>
                                    <option value="0">Non</option>
                                    <option value="1">Oui</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <div className="dashboard-card-content">
                            <div className="form-group">
                                <label htmlFor="question_2">
                                    Avez-vous des plantes dans votre domicile ou en extérieur ?
                                </label>
                                <select id="question_2"
                                        className="custom-select">
                                    <option/>
                                    <option value="0">Non</option>
                                    <option value="1">Oui</option>
                                </select>
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
)(DetailsPage)