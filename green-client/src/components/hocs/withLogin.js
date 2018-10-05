import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import { requestData } from '../../reducers/data'

const withLogin = (config = {}) => WrappedComponent => {
    const { failRedirect, successRedirect } = config

    class _withLogin extends PureComponent {

        componentDidMount = prevProps => {
            const { dispatch, history, location, user } = this.props

            if (user !== null) return

            dispatch(requestData('GET', `/users/current`, {
                handleSuccess: () => {
                    if (successRedirect && successRedirect !== location.pathname)
                        history.push(successRedirect)
                },
                handleFail: () => {
                    if (failRedirect && failRedirect !== location.pathname)
                        history.push(failRedirect)
                },
            }))
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }
    return compose(
        withRouter,
        connect(state => ({ user: state.user }))
    )(_withLogin)
}

export default withLogin
