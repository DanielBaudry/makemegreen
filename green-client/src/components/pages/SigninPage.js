import React, { Component } from 'react';
import moment from 'moment'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { NavLink } from 'react-router-dom'
import { requestData } from "../../reducers/data";


class ConnexionPage extends Component {

    constructor (props) {
        super(props)
        this.state = { email: null,
                       password: null}
    }

    onSubmitedClick = () => {
        this.props.dispatch(requestData('POST',
            '/users/signin',
            {
                body: {"email" : this.state.email,
                       "password": this.state.password},
                handleSuccess: (state, action) => {
                    // TODO: handle redirect to first requested page
                    // this.state.data.user = r
                    const { history } = this.props
                    // setTimeout(() => { history.push(`/home`) }, 4000)
                    history.push(`/home`)
                },
                key: "users"
            }))
    }

    render () {

        return(
            <div className="text-center">
                <form className="form-signin"
                      onSubmit={e => { e.preventDefault(); this.onSubmitedClick();} }>
                    <h1 className="h3 mb-3 font-weight-normal">Connexion</h1>
                    <label for="email" className="sr-only">Adresse email</label>
                    <input type="email"
                           id="email"
                           className="form-control"
                           placeholder="Email"
                           onChange={( e ) => this.setState({ email : e.target.value })}
                           value={this.state.email}
                           required autoFocus/>
                    <label for="password" className="sr-only">Mot de passe</label>
                    <input type="password" id="password" className="form-control" placeholder="Mot de passe" required
                           onChange={( e ) => this.setState({ password : e.target.value })}
                           value={this.state.password}/>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Connexion</button>
                </form>
                <div className="my-5 pt-5 text-center">
                        <NavLink to="/footprint" className="button is-secondary">
                        {"Inscription"}
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default compose(connect())(ConnexionPage)