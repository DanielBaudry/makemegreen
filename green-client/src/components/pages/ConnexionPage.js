import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {requestData} from "../../reducers/data";

class ConnexionPage extends Component {

    constructor () {
        super()
        this.state = { email: null,
                        password: null}
    }

    onSubmitedClick = () => {
        this.props.dispatch(requestData('POST',
            '/users/signin',
            {
                body: {"email" : this.state.email,
                       "password": this.state.password},
                handleSuccess: (r) => {
                    console.log(r)
                    // this.state.data.user = r
                    const { history } = this.props
                    history.push(`/home`)
                },
                key: "user"
            }))
    }

    render () {
        // const { footprints } = this.props
        const footprints = this.props.footprints[0]['footprints']

        return(
            <div class="text-center">
                <form class="form-signin"
                      onSubmit={e => { e.preventDefault(); this.onSubmitedClick();} }>
                    <h1 class="h3 mb-3 font-weight-normal">Connexion</h1>
                    <label for="email" class="sr-only">Adresse email</label>
                    <input type="email"
                           id="email"
                           class="form-control"
                           placeholder="Email"
                           onChange={( e ) => this.setState({ email : e.target.value })}
                           value={this.state.email}
                           required autofocus/>
                    <label for="password" class="sr-only">Mot de passe</label>
                    <input type="password" id="password" class="form-control" placeholder="Mot de passe" required
                           onChange={( e ) => this.setState({ password : e.target.value })}
                           value={this.state.password}/>
                    <input type="hidden" value={footprints}/>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Connexion</button>
                </form>
                <div class="my-5 pt-5 text-center">
                        <NavLink to="/inscription" className="button is-secondary">
                        {"Inscription"}
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ footprints: state.data.footprints })
)(ConnexionPage)