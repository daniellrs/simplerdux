import React, { Component } from 'react';
import './App.css';
import { fieldsState } from '../../dist/';
import { Input, Notification } from '../../dist/components/';

class App extends Component {

  componentDidMount() {
    this.props.setField( 'notification.text', {value: 'Mensagem de Alerta'} );
    this.props.setField( 'timer', {value: '5000'} );
    this.props.setField( 'type', {value: 'success'} );
  }

  adicionaNotificacao = () => {
    const { getField, setField } = this.props;

    const notifications = getField( 'notification' ).value;
    notifications.push( {
      text: getField( 'notification.text' ).value,
      type: getField( 'type' ).value,
      timer: getField( 'timer' ).value,
    } );

    setField( 'notification', {value: notifications } );
  }

  render() {
    return (
      <div>
          <form onSubmit={( e ) => e.preventDefault( )}>
              <Input field='notification.text' placeholder='Mensagem...' fieldDidUpdate={console.log} />
              <Input field='timer' placeholder='Tempo em ms...' />

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
          {JSON.stringify( this.props.getField( 'notification' ) )}
          <br />

          <Notification field='notification' appearClass='sd-notification-appear' disappearClass='sd-notification-disappear' disappearTimer={300} popUps={{
              success: ( s ) => <div className='notification-success'>{s.text}</div>,
              info: ( s ) => <h1 style={{background: 'blue', color: '#fff'}}>{s.text}</h1>,
              warning: ( s ) => <h1 style={{background: 'yellow', color: '#fff'}}>{s.text}</h1>,
              danger: ( s ) => <h1 style={{background: 'red', color: '#fff'}}>{s.text}</h1>,
          }} />

      </div>
    );
  }
}

export default fieldsState( App );
