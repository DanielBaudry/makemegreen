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
        this.isValidated = this.isValidated.bind(this);
    }

    componentDidMount () {}


    componentWillUnmount() {}

    send_data () {
        console.log("Toto")
        const store = this.props.getStore()
        console.log(store)
        this.props.dispatch(requestData('POST',
            'footprint/compute',
            {
                body: store,
                handleSuccess: () => {
                    const { history } = this.props
                    history.push(`/result`)
                },
                key: "footprints"
            }))
    }


    isValidated() {
        const userInput = this._grabUserInput();
        console.log("userInput")
        console.log(userInput)
        this.props.updateStore({
            ...userInput,
            savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
        });

        const data_to_send = this.props.getStore()
        console.log(data_to_send)

        //TODO: test if last element
        // if so, send data*
        const { isLastElement} = this.props
        if ( isLastElement ) {
            this.props.dispatch(requestData('POST',
                'footprint/compute',
                {
                    body: {
                        red_meat_frequency: this.state.red_meat_frequency,
                        white_meat_frequency: this.state.white_meat_frequency,
                        green_garbage: this.state.green_garbage,
                        yellow_garbage: this.state.yellow_garbage,
                        bath_or_shower: this.state.bath_or_shower,
                        bath_shower_frequency: this.state.bath_shower_frequency,
                        clothes_composition: this.state.clothes_composition,
                        train_frequency: this.state.train_frequency,
                        personal_vehicule_frequency: this.state.personal_vehicule_frequency,
                        personal_vehicule_consumption: this.state.personal_vehicule_consumption,
                        carpooling_frequency: this.state.carpooling_frequency,
                        public_transportation_frequency: this.state.public_transportation_frequency,
                        plain_frequency: this.state.plain_frequency
                    },
                    handleSuccess: () => {
                        const {history} = this.props
                        history.push(`/result`)
                    },
                    key: "footprints"
                }))
        }
    }

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
    }

    _grabUserInput() {
        const {property_name} = this.props
        return {
            [property_name]: this.refs[property_name].value,
        };
    }

    render(){
        const {question_name, answers, property_name, isLastElement} = this.props

        return (
            <div className="mb-3">
                {!isLastElement ?(
                        <div>
                            <label htmlFor="question">{ question_name }</label>
                            <select className="form-control"
                                    id="question"
                                    ref={property_name}
                                    onBlur={this.validationCheck}
                                    defaultValue={this.state.gender} >
                                {
                                    answers.map(answer => (
                                        <option key={answer.id}
                                                value={ answer.id }>
                                            { answer.text }
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    ):(
                    <button className="btn btn-primary"
                        onClick={e => { e.preventDefault(); this.send_data();} }
                        type="submit">Calculer mon empreinte écologique</button>
                    )}
            </div>
        )
    }

}

export default connect()(QuestionItem)
