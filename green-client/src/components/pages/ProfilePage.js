import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import withLogin from "../hocs/withLogin"
import NavBar from "../items/NavBar";
import {requestData} from "../../reducers/data";
import get from "lodash.get";
import avatar from '../../assets/avatar_green.png';
import details from '../../assets/details.png';
import "../../styles/profile.css";
import {NavLink} from "react-router-dom";

class ProfilePage extends Component {

    constructor (props) {
        super(props)
        this.state = { isLoading: true,
            friend_email: '',
            username: null,
            email: null
        }
    }

    onAddFriendClick = () => {
        console.log(this.state.friend_email)
    }

    onSignOutClick = () => {
        const { history } = this.props
        this.props.dispatch(requestData('GET', '/users/signout', {
            handleSuccess: () => {
                history.push('/welcome')
            },
        }))
    }

    componentWillMount () {
        this.props.dispatch(requestData('GET', '/users/current', {
            handleSuccess: (state, action) => {
                const username = get(action, 'data.username')
                const email = get(action, 'data.email')
                this.setState({
                    "isLoading": false,
                    "username": username,
                    "email": email,
                })
            },
        }))
    }

    render () {
        const { isLoading } = this.state

        return(
            <div>

                <NavBar />

                <div className="title-header">
                    <h5>Mon profil</h5>
                </div>

                <div className="container content">
                    {!isLoading ? (
                        <div>
                            <div className="profile-identity">
                                <div className="row">
                                    <div className="col text-center">
                                        <img src={ avatar } alt="profile picture"/>
                                    </div>
                                    <div className="col text-left">
                                        <h4>
                                            {this.state.username}
                                        </h4>
                                        <div>
                                            {this.state.email}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-card">
                                <div className="dashboard-card-title">
                                    Mes informations
                                </div>
                                <div className="dashboard-card-content">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item profile-item">
                                            <NavLink to="/habits">
                                                <div className="row">
                                                    <div className="col text-left">
                                                        J'ai changé mes habitudes
                                                    </div>
                                                    <div className="col-2 text-center">
                                                        <img className="details-img" src={ details } alt="go to details"/>
                                                    </div>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="list-group-item profile-item">
                                            <NavLink to="/friends">
                                                <div className="row">
                                                    <div className="col text-left">
                                                        Je veux donner plus d'informations
                                                    </div>
                                                    <div className="col-2 text-center">
                                                        <img className="details-img" src={ details } alt="go to details"/>
                                                    </div>
                                                </div>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="dashboard-card">
                                <div className="dashboard-card-title">
                                    Mes amis
                                </div>
                                <div className="dashboard-card-content">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item profile-item">
                                            <a data-toggle="collapse"
                                               href="#add-friend-form"
                                               aria-expanded="false"
                                               aria-controls="add-friend-form">
                                                Ajouter un ami
                                            </a>
                                            <div className="collapse"
                                                 id="add-friend-form">
                                                <div className="card card-body">
                                                    <form className="form-inline"
                                                        onSubmit={e => { e.preventDefault();
                                                          this.onAddFriendClick();} }>
                                                        <div className="form-group mb-2">
                                                            <input type="email"
                                                                   id="friend_email"
                                                                   className="form-control"
                                                                   placeholder="Email de mon ami"
                                                                   onChange={( e ) => this.setState({ friend_email : e.target.value })}
                                                                   value={this.state.friend_email}
                                                                   required />
                                                        </div>
                                                        <button className="btn btn-primary mb-2"
                                                                type="submit">
                                                            Ajouter
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item profile-item">
                                            <NavLink to="/friends">
                                                <div className="row">
                                                    <div className="col text-left">
                                                        Voir la liste de mes amis
                                                    </div>
                                                    <div className="col-2 text-center">
                                                        <img className="details-img" src={ details } alt="go to details"/>
                                                    </div>
                                                </div>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    ):(
                        <div>Chargement en cours ...</div>
                    )
                    }

                    <div className="dashboard-card">
                        <div className="dashboard-card-title">
                            Mon compte
                        </div>
                        <div className="dashboard-card-content">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item profile-item">
                                    <NavLink to="#">
                                        Recevoir la newsletter
                                    </NavLink>
                                </li>
                                <li className="list-group-item profile-item">
                                    <NavLink to="#">
                                        Changer mon mot de passe
                                    </NavLink>
                                </li>
                                <li className="list-group-item profile-item">
                                    <NavLink to="#"
                                             onClick={this.onSignOutClick}>
                                        Me déconnecter
                                    </NavLink>
                                </li>
                                <li className="list-group-item profile-item">
                                    <NavLink to="#"
                                             className="delete-account">
                                        Supprimer mon compte
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default compose(
    withLogin({ failRedirect: '/welcome' }),
    connect()
)(ProfilePage)