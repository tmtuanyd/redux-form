import logo from './logo.svg';
import './App.css';
import ContactForm from "./component/ContactForm";

import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);

  }
  showResults = (event) => {
    console.log('hello')
  }

  render() {
    return (
        <ContactForm/>
    );
  }
}

export default App;
