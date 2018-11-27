import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import {NavLink} from "react-router-dom";

export default class Wizard extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    }
    static Page = ({ children }) => children

    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            values: props.initialValues || {}
        }
    }
    next = values =>
        this.setState(state => ({
            page: Math.min(state.page + 1, this.props.children.length - 1),
            values
        }))

    previous = () =>
        this.setState(state => ({
            page: Math.max(state.page - 1, 0)
        }))

    /**
     * NOTE: Both validate and handleSubmit switching are implemented
     * here because 🏁 Redux Final Form does not accept changes to those
     * functions once the form has been defined.
     */

    validate = values => {
        const activePage = React.Children.toArray(this.props.children)[
            this.state.page
            ]
        return activePage.props.validate ? activePage.props.validate(values) : {}
    }

    handleSubmit = values => {
        const { children, onSubmit } = this.props
        const { page } = this.state
        const isLastPage = page === React.Children.count(children) - 1
        if (isLastPage) {
            return onSubmit(values)
        } else {
            this.next(values)
        }
    }

    render() {
        const { children } = this.props
        const { page, values } = this.state
        const activePage = React.Children.toArray(children)[page]
        const isLastPage = page === React.Children.count(children) - 1
        return (
            <Form
                initialValues={values}
                validate={this.validate}
                onSubmit={this.handleSubmit}>
                {({ handleSubmit, submitting }) => (
                    <form className="footprint-form"
                        onSubmit={handleSubmit}>
                        {activePage}
                        <div className="buttons">
                            {page > 0 && (
                                <button className="btn btn-primary" type="button" onClick={this.previous}>
                                    « Précédent
                                </button>
                            )}
                            {!isLastPage && <button className="btn btn-primary" type="submit">Suivant »</button>}
                            {isLastPage && (
                                <button className="btn btn-primary" type="submit" disabled={submitting}>
                                    Calculer mon empreinte
                                </button>
                            )}
                        </div>

                        <div className="fixed-bottom">
                            <NavLink to="/welcome" className="text-left">
                                Retour à la page d'acceuil
                            </NavLink>
                        </div>
                    </form>
                )}
            </Form>
        )
    }
}
