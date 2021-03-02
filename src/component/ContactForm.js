import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError, formValueSelector } from 'redux-form'
import {connect} from "react-redux";
import {compose} from "redux";
import {load} from "../reducers/Action";

const data = {
    firstName: 'Tuan',
    lastName: 'Tran',
    email: 'tmtuanyd@gmail.com'
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)
const mySubmit = (value) => {
    let {firstName, lastName, email} = value
    console.log(value)
    if (!['john', 'paul', 'george', 'ringo'].includes(firstName)) {
        throw new SubmissionError({
            firstName: 'User does not exist',
            _error: 'Login failed!'
        })
    } else {
        alert(JSON.stringify(value))
    }
}

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            imageFile: []
        }
    }

    // onChange = (e) => {
    //     console.log(e)
    //     const { input: { onChange } } = this.props
    //     onChange(e.target.files[0])
    // }
    CustomFile = ({ input, type, meta }) => {
        const { mime } = this.props;
        return (
            <div>
                <input
                    name={input.name}
                    type={type}
                    accept={mime}
                    onChange={event => this.handleChange(event, input)}
                />
            </div>
        );
    };
    handleChange = (event, input) => {
        event.preventDefault();
        console.log(input)
        let imageFile = event.target.files[0];
        if (imageFile) {
            console.log(imageFile)
            input.onChange(imageFile)
            // const localImageUrl = URL.createObjectURL(imageFile);
            // const imageObject = new window.Image();
            // imageObject.onload = () => {
            //     imageFile.width = imageObject.naturalWidth;
            //     imageFile.height = imageObject.naturalHeight;
            //     input.onChange(imageFile);
            //     URL.revokeObjectURL(imageFile);
            // };
            // imageObject.src = localImageUrl;
        }
    };

    render() {
        const {handleSubmit, error} = this.props
        return <form onSubmit={handleSubmit(mySubmit)}>
            <div>
                <button type="button" onClick={() => this.props.load(data)}>Load Account</button>
            </div>
            <div>
                {/*<label htmlFor="firstName">First Name</label>*/}
                <Field name="firstName" label={'First Name'} component={renderField} type="text"/>
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" component="input" type="text" />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <Field name="email" component="input" type="email" />
            </div>
            <div>
                <label htmlFor="avatar">Avatar</label>
                <Field name="avatar" component={this.CustomFile} type="file"/>
            </div>
            {error && <strong>{error}</strong>}
            {/*<button type={"submit"}>Submit</button>*/}
        </form>
    }
}

const selector = formValueSelector('contact')
const mapStateToProps = state => {
    return {
        initialValues: data,
        firstName: selector(state,['avatar'])
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        load: (data) => dispatch(load(data)),
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), reduxForm({
    // a unique name for the form
    form: 'contact',
    onSubmit: mySubmit,
    enableReinitialize : true,
})) (ContactForm)




