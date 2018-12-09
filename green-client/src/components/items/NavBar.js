import React from 'react'
import activities from '../../assets/activity_green.png'
import propositions from '../../assets/propositions.png'
import progress from '../../assets/stats_green.png'
import dashboard from '../../assets/dashboard_icon_green.png'
import avatar from '../../assets/avatar_green.png'
import {NavLink} from "react-router-dom";

import '../../styles/navbar.css'

const NavBar = ({
}) => {

    return (
        <div className="header-menu">
            <nav className="nav-bar fixed-bottom">
                <div className="container">
                    <ul className="nav navbar-nav navbar-right mobile-bar">
                        <li className="nav-item">
                            <NavLink to="/home" className="nav-link secondary">
                                <img alt="" src={dashboard} className="navbar-avatar" />
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/activities" className="nav-link secondary">
                                <img alt="" src={activities} className="navbar-avatar" />
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/propositions" className="nav-link main">
                                <img alt="" src={propositions} className="navbar-avatar" />
                            </NavLink>
                        </li>
                            <li className="nav-item">
                            <NavLink to="/progress" className="nav-link secondary">
                                <img alt="" src={progress} className="navbar-avatar" />
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/profile" className="nav-link secondary">
                                <img alt="" src={avatar} className="navbar-avatar" />
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/*<NavLink*/}
                    {/*to="#"*/}
                    {/*className="nav-link list-inline-item"*/}
                    {/*onClick={this.onSignOutClick}>*/}
                    {/*Déconnexion*/}
                {/*</NavLink>*/}

            </nav>
        </div>
    )
}

export default NavBar
