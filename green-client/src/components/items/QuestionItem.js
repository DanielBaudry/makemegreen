import get from 'lodash.get'
import {requestData} from "../../reducers/data";
import React, {Component} from 'react'
import {connect} from "react-redux";
import FootprintResultItem from "./FootprintResultItem";


class QuestionItem extends Component {

    constructor(props){
        super(props)
        const {property_name} = this.props
        this.state = {
            [property_name]: props.getStore()[property_name]
        };
        this.validationCheck = this.validationCheck.bind(this);
    }

    componentDidMount () {}


    componentWillUnmount() {}


    validationCheck() {
        console.log("Validation Check")
        const userInput = this._grabUserInput(); // grab user entered vals
        console.log(userInput)
        this.setState(Object.assign(userInput));
        console.log("userInput")
        console.log(userInput)
        this.props.updateStore({
            ...userInput,
            savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
        });

        const { isLastElement } = this.props
        const store = this.props.getStore()
        if ( isLastElement ) {
            this.props.dispatch(requestData('POST',
                'footprint/compute',
                {
                    body: store,
                    key: "footprints"
                }))
        }
    }

    _grabUserInput() {
        const {property_name} = this.props
        return {
            [property_name]: this.refs[property_name].value,
        };
    }

    render(){
        const {question_name, answers, property_name } = this.props

        return (
            <div className="mb-3">
                <label htmlFor="question">{ question_name }</label>
                <select className="form-control"
                        id="question"
                        ref={property_name}
                        autoFocus={true}
                        required={true}
                        onBlur={this.validationCheck} >
                            <option selected={true}
                                    value=""
                                    disabled>Réponse</option>
                        {
                            answers.map(answer => (
                                <option key={answer.id}
                                        value={ answer.value }>
                                    { answer.text }
                                </option>
                            ))
                        }
                </select>
            </div>
        )
    }

}

export default connect()(QuestionItem)
