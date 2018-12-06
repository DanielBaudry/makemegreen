import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { NavLink } from 'react-router-dom'
import {requestData} from "../../reducers/data";
import get from "lodash.get";

class SignupPage extends Component {

    constructor (props) {
        super(props)
        this.state = { email: null,
                       username: null,
                       password: null,
                       footprints: this.props.footprints,
                        errors: null }
    }

    componentDidMount () {
        this.setState({ footprints: this.props.footprints })
    }

    onSubmitedClick = () => {
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
                handleFail: (state, action) => {
                    const errors = get(action, 'errors')
                    this.setState({ "errors": errors[Object.keys(errors)[0]] });
                },
                key: "user"
            }))
    }

    render () {
        const { footprints } = this.props

        return(
            <div className="text-center">
                <form className="form-signin"
                      onSubmit={e => { e.preventDefault(); this.onSubmitedClick();} }>
                    <h1 className="h3 mb-3 font-weight-normal">Connexion</h1>
                    <label for="username" className="sr-only">Nom d'utilisateur</label>
                    <input type="username"
                           id="username"
                           className="form-control"
                           placeholder="Username"
                           onChange={( e ) => this.setState({ username : e.target.value })}
                           value={this.state.username}
                           required autofocus/>
                    <label for="email" className="sr-only">Adresse email</label>
                    <input type="email"
                           id="email"
                           className="form-control"
                           placeholder="Email"
                           onChange={( e ) => this.setState({ email : e.target.value })}
                           value={this.state.email}
                           required autofocus/>
                    <label for="password" className="sr-only">Mot de passe</label>
                    <input type="password" id="password" className="form-control" placeholder="Mot de passe" required
                           onChange={( e ) => this.setState({ password : e.target.value })}
                           value={this.state.password}/>
                    <input type="hidden" value={footprints}/>
                    <div className="form-error">{this.state.errors}</div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Inscription</button>
                </form>
                <div className="my-5 pt-5 text-center">
                        <NavLink to="/connexion" className="button is-secondary">
                        {"Connexion"}
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default compose(connect(
    state => ({ footprints: state.data.footprints })
))(SignupPage)