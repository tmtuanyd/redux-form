import './App.css';
import ContactForm from "./component/ContactForm";
import { submit } from 'redux-form';
import React, {Component} from 'react';
import {getFormValues} from "redux-form";
import {compose} from "redux";
import {connect} from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log(this.props.values)
    return (
        <div>
          <ContactForm/>
          <button type="submit" onClick={this.props.submitForm}>Submit</button>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    values: getFormValues('contact')(state)
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    submitForm: () => dispatch(submit('contact')),
  }
};

export default compose(connect(mapStateToProps, mapDispatchToProps)) (App);
