import React, { Component } from 'react';
import { requestData } from "../../reducers/data";
import { connect } from "react-redux";
import { compose } from "redux";
import StepZilla from "react-stepzilla";

import QuestionItem from "../items/QuestionItem";
import FootprintResultPage from "./FootprintResultPage";

class FootPrintFormPage extends Component {

    constructor (props) {
        super(props);
        this.state = {};

        this.sampleStore = {
            savedToCloud: false,
            red_meat_frequency: "3",
            white_meat_frequency: "3",
            green_garbage: "1",
            yellow_garbage: "1",
            bath_or_shower: "0.25",
            bath_shower_frequency: "1",
            clothes_composition: "1",
            train_frequency: "50",
            personal_vehicule_frequency: "75",
            personal_vehicule_consumption: "25",
            carpooling_frequency: "0",
            public_transportation_frequency: "0.5",
            plain_frequency: "5"
        };
    }

    componentDidMount() {}

    componentWillUnmount() {}

    getStore() {
        return this.sampleStore;
    }

    updateStore(update) {
        this.sampleStore = {
            ...this.sampleStore,
            ...update,
        }
    }

    render () {
        if ( this.props.user ){
            const { history } = this.props
            history.push(`/home`)
        }

        const steps = [
            {name: 'StepOne', component: <QuestionItem
                    id="1"
                    property_name="red_meat_frequency"
                    isLastElement={false}
                    getStore={() => (this.getStore())}
                    updateStore={(u) => {this.updateStore(u)}}
                    question_name="A quelle fréquence manges-tu de la viande rouge ?"
                    answers={[ {'id': 0,
                        'value': 0,
                        'selected': true,
                        'text': 'jamais'},
                        {'id': 1,
                            'value': 1,
                            'text': '1 à 2 fois par semaine'},
                        {'id': 2,
                            'value': 3,
                            'text': '3 à 5 fois par semaine'},
                        {'id': 3,
                            'value': 5,
                            'text': '5 à 7 fois par semaine'},
                        {'id': 4,
                            'value': 7,
                            'text': 'à chaque repas'},]}/>},
            {name: 'StepTwo', component: <QuestionItem
                    id="2"
                    property_name="white_meat_frequency"
                    isLastElement={false}
                    getStore={() => (this.getStore())}
                    updateStore={(u) => {this.updateStore(u)}}
                    question_name="A quelle fréquence manges-tu de la viande blanche ?"
                    answers={[ {'id': 0,
                        'value': 0,
                        'text': 'jamais'},
                        {'id': 1,
                            'value': 1,
                            'text': '1 à 2 fois par semaine'},
                        {'id': 2,
                            'value': 3,
                            'text': '3 à 5 fois par semaine'},
                        {'id': 3,
                            'value': 5,
                            'text': '5 à 7 fois par semaine'},
                        {'id': 4,
                            'value': 7,
                            'text': 'à chaque repas'},]}/>},
            {name: 'StepThree', component: <QuestionItem
                    id="3"
                    property_name="green_garbage"
                    isLastElement={false}
                    getStore={() => (this.getStore())}
                    updateStore={(u) => {this.updateStore(u)}}
                    question_name="Combien de poubelle verte prends-tu chaque semaine ?"
                    answers={[ {'id': 0,
                        'value': 0,
                        'text': '0'},
                        {'id': 1,
                            'value': 1,
                            'text': '1'},
                        {'id': 2,
                            'value': 2,
                            'text': '2'},
                        {'id': 3,
                            'value': 3,
                            'text': '3'},
                        {'id': 4,
                            'value': 5,
                            'text': 'Plus de 3'},]}/>},
            {name: 'StepFour', component: <QuestionItem
                    id="4"
                    property_name="yellow_garbage"
                    isLastElement={false}
                    getStore={() => (this.getStore())}
                    updateStore={(u) => {this.updateStore(u)}}
                    question_name="Combien de poubelle jaune prends-tu chaque semaine ?"
                    answers={[ {'id': 0,
                        'value': 0,
                        'text': '0'},
                        {'id': 1,
                            'value': 1,
                            'text': '1'},
                        {'id': 2,
                            'value': 2,
                            'text': '2'},
                        {'id': 3,
                            'value': 3,
                            'text': '3'},
                        {'id': 4,
                            'value': 5,
                            'text': 'Plus de 3'},]}/>},
            {name: 'StepFive', component: <QuestionItem
                    id="5"
                    property_name="bath_or_shower"
                    isLastElement={false}
                    getStore={() => (this.getStore())}
                    updateStore={(u) => {this.updateStore(u)}}
                    question_name="Prends-tu plutôt des bains ou des douches ?"
                    answers={[ {'id': 0,
                        'value': 1,
                        'text': 'Que des bains'},
                        {'id': 1,
                            'value': 0.75,
                            'text': 'Plus de bains que de douche'},
                        {'id': 2,
                            'value': 0.25,
                            'text': 'Plus de douche que de bains'},
                        {'id': 3,
                            'value': 0,
                            'text': 'Que des douches'},]}/>},
            {name: 'StepSix', component: <QuestionItem
                    id="6"
                    property_name="bath_shower_frequency"
                    isLastElement={false}
                    getStore={() => (this.getStore())}
                    updateStore={(u) => {this.updateStore(u)}}
                    question_name="Combien de douches/bains prenez-vous par semaine ?"
                    answers={[ {'id': 0,
                        'value': 0,
                        'text': 'jamais'},
                        {'id': 1,
                            'value': 0.33,
                            'text': '1 à 2 fois par semaine'},
                        {'id': 2,
                            'value': 0.66,
                            'text': '3 à 5 fois par semaine'},
                        {'id': 3,
                            'value': 1,
                            'text': '5 à 7 fois par semaine'},]}/>},
            {name: 'StepSeven', component: <QuestionItem
                    id="7"
                    property_name="clothes_composition"
                    isLastElement={false}
                    getStore={() => (this.getStore())}
                    updateStore={(u) => {this.updateStore(u)}}
                    question_name="Vos vêtements sont-ils en cotton ou en laine/polyster ?"
                    answers={[ {'id': 0,
                        'value': 1,
                        'text': 'Que du cotton'},
                        {'id': 1,
                            'value': 0.75,
                            'text': 'Plus de cotton que de polyester'},
                        {'id': 2,
                            'value': 0.25,
                            'text': 'Plus de polyester que de cotton'},
                        {'id': 3,
                            'value': 0,
                            'text': 'Que de polyester'},]}/>},
            {name: 'StepEight', component: <QuestionItem
                    id="8"
                    property_name="train_frequency"
                    isLastElement={false}
                    getStore={() => (this.getStore())}
                    updateStore={(u) => {this.updateStore(u)}}
                    question_name="Quelle distance parcours-tu en train chaque semaine ?"
                    answers={[ {'id': 0,
                        'value': 50,
                        'text': '0 à 100 km'},
                        {'id': 1,
                            'value': 150,
                            'text': '101 à 200 km'},
                        {'id': 2,
                            'value': 250,
                            'text': '201 à 300 km'},
                        {'id': 3,
                            'value': 1500,
                            'text': 'Plus de 1000 km'},]}/>},
            {name: 'StepNine', component: <QuestionItem
                    id="9"
                    property_name="personal_vehicule_frequency"
                    isLastElement={false}
                    getStore={() => (this.getStore())}
                    updateStore={(u) => {this.updateStore(u)}}
                    question_name="Quelle distance parcours-tu en véhicule à moteur (hors transports en commun) par semaine ?"
                    answers={[ {'id': 0,
                        'value': 5,
                        'text': '0 à 10 km'},
                        {'id': 1,
                            'value': 25,
                            'text': '10 à 50 km'},
                        {'id': 2,
                            'value': 75,
                            'text': '51 à 100 km'},
                        {'id': 3,
                            'value': 400,
                            'text': 'Plus de 300 km'},]}/>},
            {name: 'StepTen', component: <QuestionItem
                    id="10"
                    property_name="personal_vehicule_consumption"
                    isLastElement={false}
                    getStore={() => (this.getStore())}
                    updateStore={(u) => {this.updateStore(u)}}
                    question_name="Quelle est la consommation de carburant moyenne des véhicules que tu utilises le plus souvent ?"
                    answers={[ {'id': 0,
                        'value': 2,
                        'text': '2L/100km'},
                        {'id': 1,
                            'value': 5,
                            'text': '5 L/100km'},
                        {'id': 2,
                            'value': 25,
                            'text': '+ de 20L/100km'},
                        {'id': 3,
                            'value': -1,
                            'text': 'Je ne sais pas'},]}/>},
            {name: 'StepEleven', component: <QuestionItem
                    id="11"
                    property_name="carpooling_frequency"
                    isLastElement={true}
                    getStore={() => (this.getStore())}
                    updateStore={(u) => {this.updateStore(u)}}
                    question_name="Lorsque tu voyages en voiture, à quelle fréquence fais-tu du covoiturage ?"
                    answers={[ {'id': 0,
                        'value': 0,
                        'text': '0%'},
                        {'id': 1,
                            'value': 0.25,
                            'text': '25%'},
                        {'id': 2,
                            'value': 0.75,
                            'text': '75%'},
                        {'id': 3,
                            'value': 1,
                            'text': '100%'},]}/>},



            {name: 'FinalStep', component: <FootprintResultPage/>}
        ];

        return(
            <div className={`footprint-form`}>
                <div className="text-center">
                        <h4 className="mb-3">Questions</h4>
                        <form className="form-signin"
                                onSubmit={e => { e.preventDefault(); }}>

                            <div className='step-progress'>
                                <StepZilla steps={steps}
                                           showSteps={false}
                                           prevBtnOnLastStep={false}
                                           nextTextOnFinalActionStep={"Calculer mon empreinte"}
                                           nextButtonText={"suivant"}
                                           backButtonText={"précédent"}
                                           dontValidate={false}
                                           // startAtStep={window.sessionStorage.getItem('step') ? parseFloat(window.sessionStorage.getItem('step')) : 0}
                                           // onStepChange={(step) => window.sessionStorage.setItem('step', step)}
                                />
                            </div>


                            {/*<div className="mb-3">*/}
                                {/*<label for="q_public_transportation_frequency">Pendant combien d'heures prends-tu les transports en commun chaque semaine ?</label>*/}
                                {/*<select className="form-control"*/}
                                        {/*id="q_public_transportation_frequency"*/}
                                        {/*onChange={( e ) => this.setState({ public_transportation_frequency : e.target.value })}*/}
                                        {/*value={this.state.public_transportation_frequency }>*/}
                                    {/*<option selected="True" value="0.5">0 à 1 h</option>*/}
                                    {/*<option value="1.5">1h à 2h</option>*/}
                                    {/*<option value="2.5">2h à 3h</option>*/}
                                    {/*<option value="4">3h à 5h</option>*/}
                                    {/*<option value="7.5">5h à 10h</option>*/}
                                    {/*<option value="15">10h à 20h</option>*/}
                                    {/*<option value="30">plus de 20h</option>*/}
                                {/*</select>*/}
                                {/*<div className="invalid-feedback">*/}
                                    {/*Choisissez parmis les réponses possibles.*/}
                                {/*</div>*/}
                            {/*</div>*/}

                            {/*<div className="mb-3">*/}
                                {/*<label for="q_plain_frequency ">Pendant combien d'heures prends-tu l'avion chaque année ?</label>*/}
                                {/*<select className="form-control"*/}
                                        {/*id="q_plain_frequency"*/}
                                        {/*onChange={( e ) => this.setState({ plain_frequency : e.target.value })}*/}
                                        {/*value={this.state.plain_frequency}>*/}
                                    {/*<option value="5" selected="True">0 à 5 h</option>*/}
                                    {/*<option value="10">5 à 10h</option>*/}
                                    {/*<option value="20">10 à 20h</option>*/}
                                    {/*<option value="30">20 à 30 h</option>*/}
                                    {/*<option value="40">30 à 40 h</option>*/}
                                    {/*<option value="50">40 à 50 h</option>*/}
                                    {/*<option value="100">50 à 100 h</option>*/}
                                    {/*<option value="150">plus de 100 h</option>*/}
                                {/*</select>*/}
                                {/*<div className="invalid-feedback">*/}
                                    {/*Choisissez parmis les réponses possibles.*/}
                                {/*</div>*/}
                            {/*</div>*/}

                            {/*<button className="btn btn-primary"*/}
                                    {/*onClick={e => { e.preventDefault(); this.send_data();} }*/}
                                    {/*type="submit">Calculer mon empreinte écologique</button>*/}
                        </form>
                    </div>
            </div>
        )
    }
}

export default compose(connect())(FootPrintFormPage)