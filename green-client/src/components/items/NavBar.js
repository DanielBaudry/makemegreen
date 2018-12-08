import React from 'react'
import activities from '../../assets/activity_green.png'
import recommendations from '../../assets/mmg_button_green.png'
import progress from '../../assets/stats_green.png'
import dashboard from '../../assets/dashboard_icon_green.png'
import avatar from '../../assets/avatar_green.png'
import {NavLink} from "react-router-dom";

import '../../styles/navbar.css'

const NavBar = ({
  user
}) => {

    return (
        <div className="header-menu">
            <nav className="nav-bar fixed-bottom">
                <div className="container">
                    <ul className="nav navbar-nav navbar-right mobile-bar">
                        <li className="nav-item">
                            <NavLink to="/home" className="nav-link">
                                <img alt="" src={dashboard} className="navbar-avatar" />
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/activities" className="nav-link">
                                <img alt="" src={activities} className="navbar-avatar" />
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/recommendations" className="nav-link">
                                <img alt="" src={recommendations} className="navbar-avatar" />
                            </NavLink>
                        </li>
                            <li className="nav-item">
                            <NavLink to="/progress" className="nav-link">
                                <img alt="" src={progress} className="navbar-avatar" />
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/profile" className="nav-link">
                                <img alt="" src={avatar} className="navbar-avatar" />
                            </NavLink>
                        </li>
                    </ul>
                </div>
                {/*<div class="row">*/}
                    {/*<div class="col">*/}
                        {/*<NavLink to="/progress" className="nav-link">*/}
                            {/*<img alt="" src={avatar} className="navbar-avatar" />*/}
                        {/*</NavLink>*/}
                    {/*</div>*/}
                    {/*<div class="col">*/}
                        {/*<NavLink to="/home" className="nav-link">*/}
                            {/*<img alt="" src={avatar} className="navbar-avatar" />*/}
                        {/*</NavLink>*/}
                    {/*</div>*/}
                    {/*<div class="col">*/}
                        {/*<NavLink to="/recommendations" className="nav-link">*/}
                            {/*<img alt="" src={avatar} className="navbar-avatar" />*/}
                        {/*</NavLink>*/}
                    {/*</div>*/}
                    {/*<div class="col">*/}
                        {/*<NavLink to="/activities" className="nav-link">*/}
                            {/*<img alt="" src={avatar} className="navbar-avatar" />*/}
                        {/*</NavLink>*/}
                    {/*</div>*/}
                    {/*<div class="col">*/}
                        {/*<NavLink to="/progress" className="nav-link">*/}
                            {/*<img alt="" src={avatar} className="navbar-avatar" />*/}
                        {/*</NavLink>*/}
                    {/*</div>*/}
                {/*</div>*/}

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
