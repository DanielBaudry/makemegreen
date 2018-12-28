import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import withLogin from "../hocs/withLogin"
import back from '../../assets/back.png'
import NavBar from "../items/NavBar";
import '../../styles/details.css'
import {requestData} from "../../reducers/data";
import get from "lodash.get";

class HabitsPage extends Component {


    constructor () {
        super()
        this.state = { isLoading: true,
            red_meat_frequency: false,
            white_meat_frequency: false,
            green_garbage: false,
            yellow_garbage: false,
            bath_or_shower: false,
            bath_shower_frequency: false,
            clothes_composition: false,
            train_frequency: false,
            personal_vehicule_frequency: false,
            personal_vehicule_consumption: false,
            carpooling_frequency: false,
            public_transportation_frequency: false,
            plain_frequency: false,
        };
    }

    componentWillMount () {
        this.props.dispatch(requestData('GET',
            '/property',
            {
                handleSuccess: (state, action) => {
                    const answers = get(state, 'data.answers')
                    this.setState(answers[0])
                    this.setState({"isLoading": false})
                },
                key: "answers"
            }))
    }

    onSubmitedClick = () => {
        this.props.dispatch(requestData('POST',
            '/property',
            {
                body: this.state,
                handleSuccess: () => {
                //    TODO: display ok bandeau
                },
            }))
    }

    render () {
        const { history } = this.props

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
                        Mes habitudes
                    </h5>
                </div>

                <div className="container content">

                    <form className="form-signin"
                          onSubmit={e => { e.preventDefault();
                          this.onSubmitedClick();} }>

                        <div className="mb-3">
                            <label htmlFor="q_red_meat_frequency">A quelle fréquence manges-tu de la viande rouge ?</label>
                            <select className="form-control"
                                    id="q_red_meat_frequency"
                                    onChange={( e ) => this.setState({ red_meat_frequency : e.target.value })}
                                    value={this.state.red_meat_frequency} >
                                <option />
                                <option value="0">jamais</option>
                                <option value="1">1 à 2 fois par semaine</option>
                                <option value="3">3 à 5 fois par semaine</option>
                                <option value="5">5 à 7 fois par semaine</option>
                                <option value="7">à chaque repas</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="q_white_meat_frequency">A quelle fréquence manges-tu de la viande blanche ?</label>
                            <select className="form-control"
                                    id="q_white_meat_frequency"
                                    onChange={( e ) => this.setState({ white_meat_frequency : e.target.value })}
                                    value={this.state.white_meat_frequency} >
                                <option />
                                <option value="0">jamais</option>
                                <option value="1">1 à 2 fois par semaine</option>
                                <option value="3">3 à 5 fois par semaine</option>
                                <option value="5">5 à 7 fois par semaine</option>
                                <option value="7">à chaque repas</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="q_green_garbage">Combien de poubelle verte remplis-tu chaque semaine ?</label>
                            <select className="form-control"
                                    id="q_green_garbage"
                                    onChange={( e ) => this.setState({ green_garbage : e.target.value })}
                                    value={this.state.green_garbage}>
                                <option />
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="5">plus que 3</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="q_yellow_garbage">Combien de poubelle jaune remplis-tu chaque semaine ?</label>
                            <select className="form-control"
                                    id="q_yellow_garbage"
                                    onChange={( e ) => this.setState({ yellow_garbage : e.target.value })}
                                    value={this.state.yellow_garbage}>
                                <option />
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="5">plus que 3</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="q_bath_or_shower">Prends-tu plutôt des bains ou des douches ?</label>
                            <select className="form-control"
                                    id="q_bath_or_shower"
                                    onChange={( e ) => this.setState({ bath_or_shower : e.target.value })}
                                    value={this.state.bath_or_shower}>
                                <option />
                                <option value="1">Que des bains</option>
                                <option value="0.75">Plus de bains que de douche </option>
                                <option value="0.25">Plus de douche que de bains</option>
                                <option value="0">Que des douches</option>
                            </select>
                            <div className="invalid-feedback">
                                Choisissez parmis les réponses possibles.
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="q_bath_shower_frequency">Combien de douches/bains prenez-vous par semaine ?</label>
                            <select className="form-control"
                                    id="q_bath_shower_frequency"
                                    onChange={( e ) => this.setState({ bath_shower_frequency : e.target.value })}
                                    value={this.state.bath_shower_frequency}>
                                <option />
                                <option value="0">jamais</option>
                                <option value=".33">1 à 2 fois par semaine</option>
                                <option value=".66">3 à 5 fois par semaine</option>
                                <option value="1"> 5 à 7 fois par semaine</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="q_clothes_composition">Vos vêtements sont-ils en coton ou en laine / polyster ?</label>
                            <select className="form-control"
                                    id="q_clothes_composition"
                                    onChange={( e ) => this.setState({ clothes_composition : e.target.value })}
                                    value={this.state.clothes_composition}>
                                <option />
                                <option value="1">Que du cotton</option>
                                <option value="0.75">Plus de cotton que de polyester</option>
                                <option value="0.25">Plus de polyester que de cotton</option>
                                <option value="0">Que de polyester</option>
                            </select>
                            <div className="invalid-feedback">
                                Choisissez parmis les réponses possibles.
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="q_train_frequency">Quelle distance parcours-tu en train chaque semaine ?</label>
                            <select className="form-control"
                                    id="q_train_frequency"
                                    onChange={( e ) => this.setState({ train_frequency : e.target.value })}
                                    value={this.state.train_frequency}>
                                <option />
                                <option value="50">0 à 100 km</option>
                                <option value="150">101 à 200 km</option>
                                <option value="250">201 à 300 km</option>
                                <option value="350">301 à 400 km</option>
                                <option value="500">401 à 600 km</option>
                                <option value="700">601 à 800 km</option>
                                <option value="900">801 à 1000 km</option>
                                <option value="1500">plus de 1000 km</option>
                            </select>
                            <div className="invalid-feedback">
                                Choisissez parmis les réponses possibles.
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="q_personal_vehicule_frequency">Quelle distance parcours-tu en véhicule à moteur (hors transports en commun) par semaine ?</label>
                            <select className="form-control"
                                    id="q_personal_vehicule_frequency"
                                    onChange={( e ) => this.setState({ personal_vehicule_frequency : e.target.value })}
                                    value={this.state.personal_vehicule_frequency}>
                                <option />
                                <option value="5">0 à 10 km</option>
                                <option value="25">10 à 50 km</option>
                                <option value="75">51 à 100 km</option>
                                <option value="125">101 à 150 km</option>
                                <option value="175">151 à 200 km</option>
                                <option value="250">201 à 300 km</option>
                                <option value="400">+ de 300 km</option>
                            </select>
                            <div className="invalid-feedback">
                                Choisissez parmis les réponses possibles.
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="q_personal_vehicule_consumption">Quelle est la consommation de carburant moyenne des véhicules que tu utilises le plus souvent ?</label>
                            <select className="form-control"
                                    id="q_personal_vehicule_consumption"
                                    onChange={( e ) => this.setState({ personal_vehicule_consumption : e.target.value })}
                                    value={this.state.personal_vehicule_consumption}>
                                <option />
                                <option value="2">2 L/100km</option>
                                <option value="5" >5 L/100km</option>
                                <option value="10">10 L/100km</option>
                                <option value="15">15 L/100km</option>
                                <option value="25">+ de 20L/100km</option>
                                <option value="-1">Je ne sais pas</option>
                            </select>
                            <div className="invalid-feedback">
                                Choisissez parmis les réponses possibles.
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="q_carpooling_frequency">Lorsque tu voyages en voiture, à quelle fréquence fais-tu du covoiturage ?</label>
                            <select className="form-control"
                                    id="q_carpooling_frequency"
                                    onChange={( e ) => this.setState({ carpooling_frequency : e.target.value })}
                                    value={this.state.carpooling_frequency}>
                                <option />
                                <option value="0">0 %</option>
                                <option value="0.25">25 %</option>
                                <option value="0.50">50 %</option>
                                <option value="0.75">75 %</option>
                                <option value="1">100 %</option>
                            </select>
                            <div className="invalid-feedback">
                                Choisissez parmis les réponses possibles.
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="q_public_transportation_frequency">Pendant combien d'heures prends-tu les transports en commun chaque semaine ?</label>
                            <select className="form-control"
                                    id="q_public_transportation_frequency"
                                    onChange={( e ) => this.setState({ public_transportation_frequency : e.target.value })}
                                    value={this.state.public_transportation_frequency }>
                                <option />
                                <option value="0.5">0 à 1 h</option>
                                <option value="1.5">1h à 2h</option>
                                <option value="2.5">2h à 3h</option>
                                <option value="4">3h à 5h</option>
                                <option value="7.5">5h à 10h</option>
                                <option value="15">10h à 20h</option>
                                <option value="30">plus de 20h</option>
                            </select>
                            <div className="invalid-feedback">
                                Choisissez parmis les réponses possibles.
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="q_plain_frequency ">Pendant combien d'heures prends-tu l'avion chaque année ?</label>
                            <select className="form-control"
                                    id="q_plain_frequency"
                                    onChange={( e ) => this.setState({ plain_frequency : e.target.value })}
                                    value={this.state.plain_frequency}>
                                <option />
                                <option value="5">0 à 5 h</option>
                                <option value="10">5 à 10h</option>
                                <option value="20">10 à 20h</option>
                                <option value="30">20 à 30 h</option>
                                <option value="40">30 à 40 h</option>
                                <option value="50">40 à 50 h</option>
                                <option value="100">50 à 100 h</option>
                                <option value="150">plus de 100 h</option>
                            </select>
                            <div className="invalid-feedback">
                                Choisissez parmis les réponses possibles.
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary"
                                    type="submit">
                                Sauvegarder
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        )
    }
}


export default compose(
    withLogin({ failRedirect: '/welcome' }),
    connect()
)(HabitsPage)