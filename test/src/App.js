import React, { Component } from 'react';
import './App.css';
import Input from './Input';
import { fieldsState } from '../../dist/'

class App extends Component {
  render() {
    return (
      <div>
          <Input field='login.email' />
          <Input field='login.senha' />
          <p>
              {JSON.stringify( this.props.getField( 'login.email' ) )}
          </p>
          <p>
              {this.props.getField( 'login.senha' ).value}
          </p>
      </div>
    );
  }
}

export default fieldsState(App);
