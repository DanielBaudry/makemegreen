import has from 'lodash.has'
import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App from './App'
import NoMatchPage from './components/pages/NoMatchPage'
import routes from './utils/routes'


const Root = () => {
    return (
        <BrowserRouter>
            <App>
                <Switch>
                    {routes.map(route => {
                        const hasExact = has(route, 'exact')
                        const isexact = hasExact ? route.exact : true
                        // first props, last overrides
                        return <Route {...route} key={route.path} exact={isexact} />
                    })}
                    <Route component={NoMatchPage} />
                </Switch>
            </App>
        </BrowserRouter>
    )
}

export default hot(module)(Root)
