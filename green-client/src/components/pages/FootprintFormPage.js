import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";
import { Field } from 'react-final-form'
import Wizard from './Wizard'
import {requestData} from "../../reducers/data";

import '../../styles/footprint-form.css'

const Error = ({ name }) => (
    <Field
        name={name}
        subscribe={{ touched: true, error: true }}
        render={({ meta: { touched, error } }) =>
            touched && error ? <div className="form-error">{error}</div> : null
        }
    />
)


class FootPrintFormPage extends Component {

    constructor (props) {
        super(props);
        this.state = {};

        this.store = {
            red_meat_frequency: false,
            white_meat_frequency: false,
            green_garbage: false,
            yellow_garbage: false,
            bath_or_shower: "0.25",
            bath_shower_frequency: "1",
            clothes_composition: "1",
            train_frequency: "50",
            personal_vehicule_frequency: "75",
            personal_vehicule_consumption: "25",
            carpooling_frequency: "0",
            public_transportation_frequency: "0.5",
            plain_frequency: "5",
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


    onSubmit = (values) => {
        this.props.dispatch(requestData('POST',
            'footprint/compute',
            {
                body: values,
                handleSuccess: () => {
                    const { history } = this.props
                    history.push(`/result`)
                },
                key: "footprints"
            }))
    }

    render () {
        if ( this.props.user ){
            const { history } = this.props
            history.push(`/home`)
        }

        return(
            <div className="footprint-form">
                <div className="text-center">
                    <h4 className="mb-3">Bilan écologique</h4>
                    <Wizard
                        initialValues={this.store}
                        onSubmit={ this.onSubmit }
                    >
                        <div className="footprint-form-intro">
                            <blockquote className="blockquote">
                                <p>Si vous ne pouvez pas le mesurer, vous ne pouvez pas l'améliorer.</p>
                                <footer className="blockquote-footer">William THOMSON, Lord KELVIN</footer>
                            </blockquote>
                            <div className="footprint-form-intro-content">
                                <p>Avant de pouvoir vous proposer des recommendations adaptées,
                            nous avons besoin d'en connaitre un peu plus sur vos habitudes. Pour cela, nous avons prévu
                            un questionaire en 10 étapes.
                                </p>
                            </div>
                        </div>
                        <Wizard.Page validate={values => {
                                         const errors = {}
                                         if (!values.red_meat_frequency) {
                                             errors.red_meat_frequency = 'Merci de choisir une réponse'
                                         }
                                         return errors
                                     }}>
                            <div className="form-group">
                                <label htmlFor="question_1">A quelle fréquence manges-tu de la viande rouge ?</label>
                                <Field
                                    className="custom-select"
                                    id="question_1"
                                    name="red_meat_frequency"
                                    component="select"
                                    placeholder="Votre réponse"
                                >
                                    <option />
                                    <option value="0">jamais</option>
                                    <option value="1">1 à 2 fois par semaine</option>
                                    <option value="3">3 à 5 fois par semaine</option>
                                    <option value="5">5 à 7 fois par semaine</option>
                                    <option value="7">à chaque repas</option>
                                </Field>
                                <Error className="invalid-feedback"
                                       name="red_meat_frequency" />
                            </div>
                        </Wizard.Page>
                        <Wizard.Page validate={values => {
                            const errors = {}
                            if (!values.white_meat_frequency) {
                                errors.white_meat_frequency = 'Merci de choisir une réponse'
                            }
                            return errors
                        }}>
                            <div className="form-group">
                                <label htmlFor="question_2">A quelle fréquence manges-tu de la viande blanche ?</label>
                                <Field
                                    className="custom-select"
                                    id="question_2"
                                    name="white_meat_frequency"
                                    component="select"
                                    placeholder="Votre réponse"
                                >
                                    <option />
                                    <option value="0">jamais</option>
                                    <option value="1">1 à 2 fois par semaine</option>
                                    <option value="3">3 à 5 fois par semaine</option>
                                    <option value="5">5 à 7 fois par semaine</option>
                                    <option value="7">à chaque repas</option>
                                </Field>
                                <Error className="invalid-feedback"
                                       name="white_meat_frequency" />
                            </div>
                        </Wizard.Page>
                        <Wizard.Page validate={values => {
                            const errors = {}
                            if (!values.green_garbage) {
                                errors.green_garbage = 'Merci de choisir une réponse'
                            }
                            return errors
                        }}>
                            <div className="form-group">
                                <label htmlFor="question_3">Combien de poubelle verte prends-tu chaque semaine ?</label>
                                <Field
                                    className="custom-select"
                                    id="question_3"
                                    name="green_garbage"
                                    component="select"
                                    placeholder="Votre réponse"
                                >
                                    <option />
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="5">plus que 3</option>
                                </Field>
                                <Error className="invalid-feedback"
                                       name="green_garbage" />
                            </div>
                        </Wizard.Page>
                        <Wizard.Page validate={values => {
                            const errors = {}
                            if (!values.yellow_garbage) {
                                errors.yellow_garbage = 'Merci de choisir une réponse'
                            }
                            return errors
                        }}>
                            <div className="form-group">
                                <label htmlFor="question_4">Combien de poubelle jaune prends-tu chaque semaine ?</label>
                                <Field
                                    className="custom-select"
                                    id="question_4"
                                    name="yellow_garbage"
                                    component="select"
                                    placeholder="Votre réponse"
                                >
                                    <option />
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="5">plus que 3</option>
                                </Field>
                                <Error className="invalid-feedback"
                                       name="yellow_garbage" />
                            </div>
                        </Wizard.Page>
                    </Wizard>
                    </div>
            </div>
        )
    }
}

export default compose(connect())(FootPrintFormPage)