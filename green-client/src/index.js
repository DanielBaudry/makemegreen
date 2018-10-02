import React from 'react';
import ReactDOM from 'react-dom'
import registerCacheWorker from './workers/cache'
// import registerServiceWorker from './registerServiceWorker'
import './styles/index.css'

import Root from './Root'

const initApp = () => {
    ReactDOM.render(<Root />, document.getElementById('root'))
    registerCacheWorker()
}

initApp()
