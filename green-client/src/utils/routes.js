import React from 'react'
import { Redirect } from 'react-router'

import FootPrintFormPage from '../components/pages/FootprintFormPage'
import FootPrintResultPage from '../components/pages/FootprintResultPage'
import FootprintsPage from '../components/pages/FootprintsPage';
import SigninPage from '../components/pages/SigninPage';
import DashboardPage from "../components/pages/DashboardPage";
import SignupPage from "../components/pages/SignupPage";
import RecommendationsPage from "../components/pages/RecommendationsPage";
import RecommendationFormPage from "../components/pages/RecommendationFormPage";
import LandingPage from "../components/pages/LandingPage";

const routes = [
    {
        path: '/',
        render: () => <Redirect to="/home" />,
    },
    {
        component: LandingPage,
        path: '/welcome',
        title: "Bienvenue sur MakeMeGreen",
    },
    {
        component: FootPrintFormPage,
        path: '/footprint',
        title: "Calculer votre empreinte",
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
    {
        component: RecommendationsPage,
        path: '/recommendations',
        title: "Recommendations",
    },
    {
        component: RecommendationFormPage,
        path: '/recommendation',
        title: "Recommendation",
    },
]

export default routes
