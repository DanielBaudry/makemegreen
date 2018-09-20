import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {requestData} from "../../reducers/data";
import withLogin from "../hocs/withLogin"
import RecommendationItem from "../items/RecommendationItem";

class RecommendationFormPage extends Component {


    constructor () {
        super()
        this.state = { name: null,
                       content: null,
                       benefit: null,
                       type: null,
                       difficulty_level: null}
    }

    onSubmitedClick = () => {
        this.props.dispatch(requestData('POST',
            'recommendation',
            {
                body: { name: this.state.name,
                        content: this.state.content,
                        benefit: this.state.benefit,
                        type: this.state.type,
                        difficulty_level: this.state.difficulty_level
                    },
                handleSuccess: () => {
                //    TODO: write something to stay it is ok
                }
            }))
    }

    render () {
        let reco = []

        const { recommendations } = this.props
        if( recommendations && recommendations.length > 0){
            reco = recommendations[0]['recommendations']
        }


        return(
            <div class="text-center">
                Recommendations
                <div className="recommendations-form">
                    <form className="needs-validation"
                          onSubmit={e => { e.preventDefault(); this.onSubmitedClick();} }>

                        <div className="mb-3">
                            <label for="name">Titre de la recommendation</label>
                            <input className="form-control"
                                   type="text"
                                   id="name"
                                   onChange={( e ) => this.setState({ name : e.target.value })}
                                   value={this.state.name} >
                            </input>
                        </div>

                        <div className="mb-3">
                            <label for="content">Contenu de la recommendation</label>
                            <input className="form-control"
                                   type="text"
                                   id="content"
                                   onChange={( e ) => this.setState({ content : e.target.value })}
                                   value={this.state.content} >
                            </input>
                        </div>

                        <div className="mb-3">
                            <label for="type">Type de la recommendation</label>
                            <select className="form-control"
                                    id="type"
                                    onChange={( e ) => this.setState({ type : e.target.value })}
                                    value={this.state.type} >
                                <option value="carbon">Carbone</option>
                                <option value="water">Eau</option>
                                <option value="waste">Déchet</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label for="benefit">Gain de la recommendation</label>
                            <input className="form-control"
                                   type="text"
                                   id="benefit"
                                   placeholder="Quantité économisée"
                                   onChange={( e ) => this.setState({ benefit : e.target.value })}
                                   value={this.state.benefit} >
                            </input>
                        </div>

                        <div className="mb-3">
                            <label for="difficulty_level">Difficulté de la recommendation</label>
                            <select className="form-control"
                                    id="difficulty_level"
                                    onChange={( e ) => this.setState({ difficulty_level : e.target.value })}
                                    value={this.state.difficulty_level} >
                                <option value="level_1">Ultra simpple</option>
                                <option value="level_2">Ca passe</option>
                                <option value="level_3">Un peu chaud</option>
                                <option value="level_4">Duuuuur</option>
                                <option value="level_5">Faut s'accorcher</option>
                            </select>
                        </div>

                        <button className="btn btn-primary btn-lg btn-block"
                                type="submit">Ajouter ma recommendation</button>
                    </form>
                </div>
                <div class="my-5 pt-5 text-center">
                    <NavLink to="/recommendations" className="button btn-primary btn-lg active">
                        {"Retour à la liste des recommandations"}
                    </NavLink>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ recommendations: state.data.recommendations})

export default compose(
    withLogin({ failRedirect: '/welcome' }),
    connect(mapStateToProps)
)(RecommendationFormPage)