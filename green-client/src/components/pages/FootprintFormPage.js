import React, { Component } from 'react';
import {requestData} from "../../reducers/data";
import { connect } from 'react-redux'


class FootPrintFormPage extends Component {

    constructor () {
        super()
        this.state = { meat_frequency: "3_time"}
    }

    onSubmitedClick = () => {
        this.props.dispatch(requestData('POST',
            'footprint/compute',
            {
             body: {"meat_frequency" : this.state.meat_frequency },
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
            <div className={`footprint-form`}>
                <div className="row">
                    <div className="col-md-12 order-md-1">
                        <h4 className="mb-3">Questions</h4>
                        <form className="needs-validation"
                              onSubmit={e => { e.preventDefault(); this.onSubmitedClick();} }>

                            <div className="mb-3">
                                <label for="question-1">A quelle fréquence manges-tu de la viande ?</label>
                                <select className="form-control"
                                        id="question-1"
                                        onChange={( e ) => this.setState({ meat_frequency : e.target.value })}
                                        value={this.state.meat_frequency} >
                                    <option value="never">jamais</option>
                                    <option value="1_time">1 à 2 fois par semaine</option>
                                    <option value="3_time">3 à 5 fois par semaine</option>
                                    <option value="5_time">5 à 7 fois par semaine</option>
                                    <option value="always">à chaque repas</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label for="question-2">Quelle proportion de nourriture manges-tu non transformée, non emballée ou cultivée localement ?</label>
                                <select className="form-control" id="question-2">
                                    <option>0 %</option>
                                    <option>10 %</option>
                                    <option>20 %</option>
                                    <option>30 %</option>
                                    <option>40 %</option>
                                    <option>50 %</option>
                                    <option>60 %</option>
                                    <option>70 %</option>
                                    <option>80 %</option>
                                    <option>90 %</option>
                                    <option>100 %</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label for="question-3">Quel type de logement décrit le mieux ta maison ?</label>
                                <select className="form-control" id="question-3" required>
                                    <option>Autonome, sans eau courante</option>
                                    <option>autoportant, eau courante</option>
                                    <option>appartement à plusieurs étages</option>
                                    <option>duplex, maison en rangée ou immeuble de 2 à 4 logements</option>
                                    <option>condominium de luxe</option>
                                </select>
                                <div className="invalid-feedback">
                                    Choisissez parmis les réponses possibles.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label for="question-4">Combien de personnes vivent dans ton ménage ?</label>
                                <select className="form-control" id="question-4">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6+</option>
                                </select>
                                <div className="invalid-feedback">
                                    Choisissez parmis les réponses possibles.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label for="question-5">Quelle est la taille de ta maison ?</label>
                                <select className="form-control" id="question-5">
                                    <option>moins de 10m²</option>
                                    <option>de 10 à 30m²</option>
                                    <option>de 30 à 50m²</option>
                                    <option>de 50 à 80m²</option>
                                    <option>de 80 à 120m²</option>
                                    <option>plus de 120m²</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label for="question-6">Quelle est l’efficacité énergétique de ta maison ?</label>
                                <select className="form-control" id="question-6">
                                    <option>Un peu</option>
                                    <option>Beaucoup</option>
                                    <option>Passionément</option>
                                    <option>A la folie</option>
                                    <option>Pas du tout</option>
                                </select>
                                <div className="invalid-feedback">
                                    Choisissez parmis les réponses possibles.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label for="question-7">Quel pourcentage de l'électricité de ta maison provient de sources renouvelables ?</label>
                                <select className="form-control" id="question-7">
                                    <option>0 %</option>
                                    <option>10 %</option>
                                    <option>20 %</option>
                                    <option>30 %</option>
                                    <option>40 %</option>
                                    <option>50 %</option>
                                    <option>60 %</option>
                                    <option>70 %</option>
                                    <option>80 %</option>
                                    <option>90 %</option>
                                    <option>100 %</option>
                                </select>
                                <div className="invalid-feedback">
                                    Choisissez parmis les réponses possibles.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label for="question-8">Quels poids de déchets généres-tu par mois ?</label>
                                <select className="form-control" id="question-8">
                                    <option>0 à 1 kg</option>
                                    <option>1 à 5 kg</option>
                                    <option>6 à 10 kg</option>
                                    <option>11 à 15 kg</option>
                                    <option>16 à 20 kg</option>
                                    <option>21 à 25 kg</option>
                                    <option>+ de 25 kg</option>
                                </select>
                                <div className="invalid-feedback">
                                    Choisissez parmis les réponses possibles.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label for="question-9">Quels poids distance parcours-tu en véhicule à moteur (hors transports en commun) par semaine ?</label>
                                <select className="form-control" id="question-9">
                                    <option>0 à 10 km</option>
                                    <option>10 à 50 km</option>
                                    <option>51 à 100 km</option>
                                    <option>101 à 150 km</option>
                                    <option>151 à 200 km</option>
                                    <option>201 à 250 km</option>
                                    <option>+ de 250 km</option>
                                </select>
                                <div className="invalid-feedback">
                                    Choisissez parmis les réponses possibles.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label for="question-10">Quelle est la consommation de carburant moyenne des véhicules que tu utilises le plus souvent ?</label>
                                <select className="form-control" id="question-10">
                                    <option>2 L/100km</option>
                                    <option>4 L/100km</option>
                                    <option>6 L/100km</option>
                                    <option>10 L/100km</option>
                                    <option>14 L/100km</option>
                                    <option>16 L/100km</option>
                                    <option>+ de 20L/100km</option>
                                </select>
                                <div className="invalid-feedback">
                                    Choisissez parmis les réponses possibles.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label for="question-11">Lorsque tu voyages en voiture, à quelle fréquence fais-tu du covoiturage ?</label>
                                <select className="form-control" id="question-11">
                                    <option>0 %</option>
                                    <option>10 %</option>
                                    <option>20 %</option>
                                    <option>30 %</option>
                                    <option>40 %</option>
                                    <option>50 %</option>
                                    <option>60 %</option>
                                    <option>70 %</option>
                                    <option>80 %</option>
                                    <option>90 %</option>
                                    <option>100 %</option>
                                </select>
                                <div className="invalid-feedback">
                                    Choisissez parmis les réponses possibles.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label for="question-12">Quelle distance parcours-tu en transports en commun chaque semaine ?</label>
                                <select className="form-control" id="question-12">
                                    <option>0 à 100 km</option>
                                    <option>101 à 200 km</option>
                                    <option>201 à 300 km</option>
                                    <option>301 à 400 km</option>
                                    <option>401 à 500 km</option>
                                    <option>501 à 600 km</option>
                                    <option>601 à 700 km</option>
                                    <option>701 à 800 km</option>
                                    <option>801 à 900 km</option>
                                    <option>901 à 1000 km</option>
                                </select>
                                <div className="invalid-feedback">
                                    Choisissez parmis les réponses possibles.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label for="question-13">Pendant combien d'heures prends-tu l'avion chaque année ?</label>
                                <select className="form-control" id="question-13">
                                    <option>0 à 100 km</option>
                                    <option>101 à 200 km</option>
                                    <option>201 à 300 km</option>
                                    <option>301 à 400 km</option>
                                    <option>401 à 500 km</option>
                                    <option>501 à 600 km</option>
                                    <option>601 à 700 km</option>
                                    <option>701 à 800 km</option>
                                    <option>801 à 900 km</option>
                                    <option>901 à 1000 km</option>
                                </select>
                                <div className="invalid-feedback">
                                    Choisissez parmis les réponses possibles.
                                </div>
                            </div>

                            <button className="btn btn-primary btn-lg btn-block"
                                    type="submit">Calculer mon empreinte écologique</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(FootPrintFormPage)