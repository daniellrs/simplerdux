import React, { Component } from 'react';
import './App.css';
import Input from './Input';
import { fieldsState } from '../../dist/';
import { Input as Inp } from '../../dist/components/';

class App extends Component {
  render() {
    return (
      <div>
          <Inp field='login.email' type='radio' optionValue='Valor 1' />
          <Inp field='login.email' type='radio' optionValue='Valor 2' />
          <Inp field='login.email' type='radio' optionValue='Valor 3' />
          <Inp field='login.senha' type='radio' optionValue='Valor 1' />
          <Inp field='login.senha' type='radio' optionValue='Valor 2' />
          <Inp field='login.senha' type='radio' optionValue='Valor 3' />
          <p>
              {JSON.stringify( this.props.getField( 'login.email' ) )}
          </p>
          <p>
              {JSON.stringify( this.props.getField( 'login.senha' ) )}
          </p>
      </div>
    );
  }
}

export default fieldsState(App);
