import get from 'lodash.get'
import {requestData} from "../../reducers/data";
import React, {Component} from 'react'
import {connect} from "react-redux";
import {THUMBS_URL} from "../../utils/config";
import calcul from "../../assets/calcul.png"
import detail_bottom from "../../assets/details_bottom.png"


class PropositionItem extends Component {

    constructor(){
        super()
        this.state = { reco_id: null,
            reco_type: null,
            reco_title: null,
            reco_benefit: null,
            reco_content: null,
            reco_difficulty_level: null}
    }

    onSuccessClick = () => {
        this.props.dispatch(requestData('GET',`/activity/${this.state.reco_id}`))
    }

    onFailClick = () => {
    //    TODO:
    }

    componentDidMount () {
        const { proposition } = this.props

        const reco_id = get(proposition, "id")
        const reco_type = get(get(proposition, "type"),"label")
        const reco_title = get(proposition, "title")
        const reco_benefit = get(proposition, "benefit")
        const reco_content = get(proposition, "content")
        const reco_difficulty_level = get(proposition, "difficulty_level")
        const reco_first = get(proposition, "first")

        this.setState( { "reco_id": reco_id,
                        "reco_type": reco_type,
                        "reco_title": reco_title,
                        "reco_benefit": reco_benefit,
                        "reco_content": reco_content,
                        "reco_difficulty_level": reco_difficulty_level,
                        "reco_first": reco_first,
                    } )
    }

    render(){

        let reco_category = null
        let reco_img = null

        if ( this.state && this.state.reco_type){
            switch (this.state.reco_type) {
                case 'carbon':
                    reco_category = "Sur la route"
                    reco_img = THUMBS_URL + "car_filled_color"
                    break;
                case 'water':
                    reco_category = "Dans mon assiette"
                    reco_img = THUMBS_URL + "food_filled_color"
                    break;
                case 'waste':
                    reco_category = "Chez moi"
                    reco_img = THUMBS_URL + "home_filled_color"
                    break;
            }
        }

        let class_name = "carousel-item"
        if (this.state && this.state.reco_first){
            class_name += " active"
        }

        return (
            <div className={ class_name }>
                <div className="carousel-item-inside-div">
                    <div className="carousel-center">
                        <div className="text-center">
                            <img className="proposition-img" src={ reco_img } alt="Card image cap"/>
                            <h6 className="proposition-title">
                                { this.state.reco_title }
                            </h6>
                        </div>
                        <div className="reco-benefit">
                            <div className="text-center">
                                <a className="reco-benefit-value"
                                   data-toggle="collapse"
                                   href={"#calcul"+ this.state.reco_id }
                                   aria-expanded="false"
                                   aria-controls={"calcul"+ this.state.reco_id }>
                                    { this.state.reco_benefit } kgCO2/an
                                    <img className="reco-benefit-calcul" src={ calcul } alt="calculation details"/>
                                </a>
                            </div>
                            <div className="collapse"
                                 id={"calcul"+ this.state.reco_id }>
                                <div className="card card-body">
                                    {/*{ this.state.reco_calcul }*/}
                                    1g de plastique ~= 0,045 kgCO2<br />
                                    1 tube de dentifrice = 50g de plastique<br />
                                    25 tubes de dentifrice par an<br />
                                    Impact total : 45 x 50 x 25 ~= 56 kgCO2<br />
                                </div>
                            </div>
                        </div>
                        <div className="proposition-difficulty text-center text-muted">
                            Difficulté: { this.state.reco_difficulty_level }
                        </div>

                        <div className={"proposition-didyouknow prop-" + this.state.reco_type}>
                            <h6>
                                Le saviez-vous ?
                            </h6>
                            <div className="text-left">
                                En moyenne un appareil électrique en veille utilise 20% de sa consommation
                                    en état de marche.
                            </div>
                        </div>

                        <div className="text-center">
                            <a className="proposition-detail"
                               data-toggle="collapse"
                               href={"#detail"+ this.state.reco_id }
                               aria-expanded="false"
                               aria-controls={"detail"+ this.state.reco_id }>
                                <h6>
                                    En savoir plus
                                </h6>
                                <img className="details-img" src={ detail_bottom } alt="display details"/>
                            </a>
                        </div>

                        <div className="collapse"
                             id={"detail"+ this.state.reco_id }>
                            <div className="reco-why">
                                <h6>
                                    <strong>Pourquoi le faire ?</strong>
                                </h6>
                                { this.state.reco_content }
                            </div>
                            <div className="reco-howto">
                                <h6>
                                    <strong>Comment le faire ?</strong>
                                </h6>
                                {/*{ this.state.reco_howto }*/}
                                Prenez un truc et faite un machin.
                                Le machin peut-être plus ou moins truc.
                                Sinon vous povuez aussi faire des choses comme ça :
                                <ul>
                                    <li>avec un truc</li>
                                    <li>avec une chose</li>
                                    <li>avec un bidule aussi</li>
                                </ul>
                            </div>
                        </div>


                        <div className="proposition-actions">
                            <div className="activity-actions-section proposition-add text-center col"
                                 onClick={e => { e.preventDefault(); this.onSuccessClick();} }>
                                C'est parti !
                            </div>
                            <div className="activity-actions-section proposition-drop text-center col"
                                 onClick={e => { e.preventDefault(); this.onFailClick();} }>
                                Pas pour moi
                            </div>
                        </div>

                    </div>
                    {/*<div className="carousel-caption">*/}
                        {/**/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }

}

export default connect()(PropositionItem)
