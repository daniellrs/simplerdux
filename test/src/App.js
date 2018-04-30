import React, { Component } from 'react';
import './App.css';
import { fieldsState } from '../../dist/';
import { Input } from '../../dist/components/';
import Notification from './Notification';

class App extends Component {

  componentDidMount() {
    this.props.setField( 'type', {value: 'success'} );
  }

  adicionaNotificacao = () => {
    const { getField, setField } = this.props;

    const notifications = getField( 'notification' ).value;
    notifications.push( {
      text: getField( 'text' ).value,
      type: getField( 'type' ).value,
      timer: 3000
    } );

    setField( 'text', {value: '' } );
    setField( 'notification', {value: notifications } );
  }

  render() {
    return (
      <div>
          <form onSubmit={( e ) => e.preventDefault( )}>
              <Input field='text' placeholder='Mensagem...' />

              <Input id='ts' field='type' type='radio' optionValue='success' />
              <label htmlFor='ts'>success</label>
              <Input id='ti' field='type' type='radio' optionValue='info' />
              <label htmlFor='ti'>info</label>
              <Input id='tw' field='type' type='radio' optionValue='warning' />
              <label htmlFor='tw'>warning</label>
              <Input id='td' field='type' type='radio' optionValue='danger' />
              <label htmlFor='td'>danger </label>
              <button onClick={this.adicionaNotificacao}>Adicionar</button>
          </form>

          <br />
          <br />
          <Notification field='notification' />
      </div>
    );
  }
}

export default fieldsState( App );
