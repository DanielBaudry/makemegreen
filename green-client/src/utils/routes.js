import React from 'react'
import { Redirect } from 'react-router'

import FootPrintForm from '../FootprintForm'
import Toto from '../Toto'

const routes = [
    {
        exact: true,
        path: '/',
        render: () => <Redirect to="/footprint" />,
    },
    {
        exact: false,
        path: '/footprint',
        render: () => <FootPrintForm />,
        title: "Bienvenue sur MakeMeGreen",
    },
    {
        exact: false,
        path: '/toto',
        render: () => <Toto />,
        title: "Toto",
    },
]

export default routes
