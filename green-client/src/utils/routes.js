import React from 'react'
import { Redirect } from 'react-router'

import FootPrintFormPage from '../components/pages/FootprintFormPage'
import FootPrintResultPage from '../components/pages/FootprintResultPage'
import FootprintsPage from '../components/pages/FootprintsPage';
import ConnexionPage from '../components/pages/ConnexionPage';
import DashboardPage from "../components/pages/DashboardPage";

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
    {
        component: ConnexionPage,
        path: '/connexion',
        title: "Connexion",
    },
    {
        component: DashboardPage,
        path: '/home',
        title: "Dashboard",
    },
]

export default routes
