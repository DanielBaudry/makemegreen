import React from 'react'
import { Redirect } from 'react-router'

import FootPrintFormPage from '../components/pages/FootprintFormPage'
import TotoPage from '../components/pages/TotoPage'

const routes = [
    {
        path: '/',
        render: () => <Redirect to="/footprint" />,
    },
    {
        component: FootPrintFormPage,
        path: '/footprint',
        title: "Bienvenue sur MakeMeGreen",
    },
    {
        component: TotoPage,
        path: '/toto',
        title: "Toto",
    },
]

export default routes
