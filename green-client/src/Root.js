import has from 'lodash.has'
import React from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'


import App from './App'
import NoMatchPage from './components/pages/NoMatchPage'
import routes from './utils/routes'
import { configureStore } from './utils/store'
const { store, persistor } = configureStore()

const Root = () => {

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
      </Provider>
    )
}

export default hot(module)(Root)
