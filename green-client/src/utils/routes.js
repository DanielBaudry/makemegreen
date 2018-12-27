import React from 'react'
import { Redirect } from 'react-router-dom'

import FootPrintFormPage from '../components/pages/FootprintFormPage'
import FootPrintResultPage from '../components/pages/FootprintResultPage'
import FootprintsPage from '../components/pages/FootprintsPage';
import SigninPage from '../components/pages/SigninPage';
import DashboardPage from "../components/pages/DashboardPage";
import SignupPage from "../components/pages/SignupPage";
import RecommendationsPage from "../components/pages/RecommendationsPage";
import RecommendationFormPage from "../components/pages/RecommendationFormPage";
import LandingPage from "../components/pages/LandingPage";
import ActivitiesPage from "../components/pages/ActivitiesPage";
import ProgressPage from "../components/pages/ProgressPage";
import PropositionsPage from "../components/pages/PropositionsPage";
import ProfilePage from "../components/pages/ProfilePage";
import DetailsPage from "../components/pages/DetailsPage";
import FriendsPage from "../components/pages/FriendsPage";
import HabitsPage from "../components/pages/HabitsPage";

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
        component: DetailsPage,
        path: '/details',
        title: "Details",
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
    {
        component: ActivitiesPage,
        path: '/activities',
        title: "Mes challenges",
    },
    {
        component: ProgressPage,
        path: '/progress',
        title: "Mes progrès",
    },
    {
        component: PropositionsPage,
        path: '/propositions',
        title: "Propositions",
    },
    {
        component: ProfilePage,
        path: '/profile',
        title: "Mon profil",
    },
    {
        component: FriendsPage,
        path: '/friends',
        title: "Mes amis",
    },
    {
        component: HabitsPage,
        path: '/habits',
        title: "Mes habitudes",
    },
]

export default routes
