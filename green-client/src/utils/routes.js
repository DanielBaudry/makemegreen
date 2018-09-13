import React from 'react'
import { Redirect } from 'react-router'

import FootPrintFormPage from '../components/pages/FootprintFormPage'
import FootPrintResultPage from '../components/pages/FootprintResultPage'
import FootprintsPage from '../components/pages/FootprintsPage';
import SigninPage from '../components/pages/SigninPage';
import DashboardPage from "../components/pages/DashboardPage";
import SignupPage from "../components/pages/SignupPage";

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
        component: SigninPage,
        path: '/connexion',
        title: "Connexion",
    },
    {
        component: SignupPage,
        path: '/inscription',
        title: "Inscription",
    },
    {
        component: DashboardPage,
        path: '/home',
        title: "Dashboard",
    },
]

export default routes
