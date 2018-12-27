import React, { Component } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import withLogin from "../hocs/withLogin"
import NavBar from "../items/NavBar";
import {requestData} from "../../reducers/data";
import get from "lodash.get";
import back from '../../assets/back.png';
import "../../styles/profile.css";

class FriendsPage extends Component {

    constructor (props) {
        super(props)
        this.state = { isLoading: true,
            friend_email: '',
            username: null,
            email: null
        }
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
        const { history } = this.props
        const { isLoading } = this.state

        return(
            <div>

                <NavBar />

                <div className="title-header">
                    <div className="back-div"
                         onClick={() => history.go(-1)}>
                        <img className="details-img"
                             src={ back }
                             alt="go to previous page"/>
                    </div>
                    <h5>
                        Mes amis
                    </h5>
                </div>

                <div className="container content">
                    Liste des amis
                </div>

            </div>
        )
    }
}

export default compose(
    withLogin({ failRedirect: '/welcome' }),
    connect()
)(FriendsPage)