import React, { Component } from 'react';
import './App.css';
import { fieldsState, setObjectFieldsValue, getObjectFieldsKey, getDefinedPropsField } from '../../dist/';
import { Input, Notification } from './components';
import notification from './notification_1.mp3';
import Hoho from './Hoho';

class App extends Component {
  state = {
    inputVl: '',
  }

  componentDidMount() {
    this.props.setField( 'notification.text', 'Mensagem de Alerta' );

    setTimeout( () => {
        this.props.setField( 'notification.text', 'Mensagem de Alerta 1' );
    }, 1000);

    this.props.setField( 'type', 'success' );

    const obj = {nome: 'Daniel', idade: 22, altura: 1.77, sexo: 'Masculino', adjetivo: 'MERDÃO', estudo: {
      ensinofundamental: 'Sinodal da paz',
      ensinomedio: 'Liberato',
      trabalho: {nome: 'unimed', salario: 2000}
    }};


    setObjectFieldsValue( 'pessoa', obj );
    console.log( getObjectFieldsKey( 'pessoa' ) );
  }

  componentDidUpdate( prevProps ) {
    console.log(getDefinedPropsField( 'notification.text', prevProps.fields ));
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
          <Hoho field='hoho' />
          <hr />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Input onChange={t => this.setState( {inputVl: t} )} value={this.state.inputVl} />
          <Input field='pessoa.nome' />
          <Input field='pessoa.idade' />
          <Input field='pessoa.altura' />
          <Input field='pessoa.sexo' />
          <Input field='pessoa.adjetivo' />
          <Input field='pessoa.estudo.ensinofundamental' defaultFieldValue='default value' />
          <Input field='pessoa.estudo.ensinomedio' />
          <Input field='pessoa.estudo.trabalho.nome' />
          <Input field='pessoa.estudo.trabalho.salario' />

          <h2>Notification</h2>
          <form onSubmit={( e ) => e.preventDefault( )}>
              <Input field='notification.text' placeholder='Mensagem...' />
              <Input field='timer' defaultFieldValue='5000' placeholder='Tempo em ms...' />

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

          <Notification field='notification' appearClass='sd-notification-appear' disappearClass='sd-notification-disappear' audio={notification} disappearTimer={300} popUps={{
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
