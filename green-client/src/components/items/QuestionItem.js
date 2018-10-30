import get from 'lodash.get'
import {requestData} from "../../reducers/data";
import React, {Component} from 'react'
import {connect} from "react-redux";


class QuestionItem extends Component {

    constructor(props){
        super(props)
        const property_name = "question_" + this.props.id
        this.state = {
            [property_name]: props.getStore()[property_name]
        };
        this.validationCheck = this.validationCheck.bind(this);
        this.isValidated = this.isValidated.bind(this);
    }

    componentDidMount () {}


    componentWillUnmount() {}

    isValidated() {
        console.log("isValidated")
        const userInput = this._grabUserInput();
        console.log(userInput)
        this.props.updateStore({
            ...userInput,
            savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
        });
    }

    validationCheck() {
        console.log("Validation Check")
        const userInput = this._grabUserInput(); // grab user entered vals
        console.log(userInput)
        this.setState(Object.assign(userInput));
    }

    _grabUserInput() {
        const property_name = "question_" + this.props.id
        return {
            [property_name]: this.refs[property_name].value,
        };
    }

    render(){
        const {question_name, answers} = this.props
        const property_name = "question_" + this.props.id

        return (
            <div className="mb-3">
                <label htmlFor="question">{ question_name }</label>
                <select className="form-control"
                        id="question"
                        ref={property_name}
                        onBlur={this.validationCheck}
                        // onChange={( e ) => this.setState({ toto : e.target.value })}
                        defaultValue={this.state.gender} >
                    {
                        answers.map(answer => (
                            <option value={ answer.id }>{ answer.text }</option>
                        ))
                    }
                </select>
            </div>
        )
    }

}

export default connect()(QuestionItem)
