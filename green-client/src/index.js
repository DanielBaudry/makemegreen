import React from 'react';
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import './styles/index.css'

import Root from './Root'

const initApp = () => {
    ReactDOM.render(<Root />, document.getElementById('root'))
    registerServiceWorker()
}

initApp()
