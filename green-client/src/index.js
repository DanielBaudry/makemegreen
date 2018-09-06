import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css'

import Root from './Root'
const NextRoot = require('./Root').default

const initApp = () => {

    ReactDOM.render(<Root />, document.getElementById('root'))
    if (module.hot) {
        module.hot.accept('./Root', () => {
            ReactDOM.render(
                <AppContainer>
                    <NextRoot />
                </AppContainer>,
                document.getElementById('root')
            )
        })
    }
    registerServiceWorker();
}

initApp()
