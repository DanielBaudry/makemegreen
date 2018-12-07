import React from 'react'
import avatar from '../../assets/avatar.svg'
import {NavLink} from "react-router-dom";

const NavBar = ({
  user
}) => {

    return (
        <div className="header-menu">
            <nav className="navbar navbar-dark">
                <NavLink className="navbar-brand" to="/home">
                            <span>
                                <img alt="" src={avatar} className="navbar-avatar" />
                            </span>
                    <span>
                            {user && user.username}
                            </span>
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to="/home" className="nav-link">
                                {"Home"}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/recommendations" className="nav-link">
                                {"Recommandations"}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/activities" className="nav-link">
                                {"Mon activité"}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/progress" className="nav-link">
                                {"Mes progrès"}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="#"
                                className="nav-link"
                                onClick={this.onSignOutClick}>
                                Déconnexion
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
