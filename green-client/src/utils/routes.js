import React from 'react'
import { Redirect } from 'react-router'

import FootPrintFormPage from '../components/pages/FootprintFormPage'
import FootPrintResultPage from '../components/pages/FootprintResultPage'
import FootprintsPage from '../components/pages/FootprintsPage';

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
        component: FootprintsPage,
        path: '/footprints',
        title: "Footprints",
    },
    {
        component: FootPrintResultPage,
        path: '/result',
        title: "Footprint Result",
    },
]

export default routes
