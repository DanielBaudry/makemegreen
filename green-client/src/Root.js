import React from 'react'
import has from 'lodash.has'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App from './App'
import routes from './utils/routes'
import NotMatch from './utils/NotMatch'

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
                    <Route component={NotMatch} />
                </Switch>
            </App>
        </BrowserRouter>
    )
}

export default Root
