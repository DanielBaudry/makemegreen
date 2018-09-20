import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {requestData} from "../../reducers/data";

class SignupPage extends Component {

    constructor (props) {
        super(props)
        this.state = { email: null,
                       username: null,
                       password: null,
                       footprints: this.props.footprints }
    }

    onSubmitedClick = (footprints_data) => {
        this.setState({ footprints : footprints_data })
        this.props.dispatch(requestData('POST',
            '/users/signup',
            {
                body: {"email" : this.state.email,
                        "password": this.state.password,
                        "username": this.state.username,
                        "footprints": this.state.footprints},
                handleSuccess: (r) => {
                    // this.state.data.user = r
                    const { history } = this.props
                    history.push(`/home`)
                },
                key: "user"
            }))
    }

    render () {
        const { footprints } = this.props

        let footprints_data = []
        if ( footprints.length > 0 ){
            footprints_data = this.props.footprints[0]['footprints']
        }
        console.log(footprints_data)


        return(
            <div class="text-center">
                <form class="form-signin"
                      onSubmit={e => { e.preventDefault(); this.onSubmitedClick({footprints_data});} }>
                    <h1 class="h3 mb-3 font-weight-normal">Connexion</h1>
                    <label for="username" class="sr-only">Nom d'utilisateur</label>
                    <input type="username"
                           id="username"
                           class="form-control"
                           placeholder="Username"
                           onChange={( e ) => this.setState({ username : e.target.value })}
                           value={this.state.username}
                           required autofocus/>
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
                    <input type="hidden" value={footprints_data}/>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Inscription</button>
                </form>
                <div class="my-5 pt-5 text-center">
                        <NavLink to="/connexion" className="button is-secondary">
                        {"Connexion"}
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ footprints: state.data.footprints })
)(SignupPage)