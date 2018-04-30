import React, { Component } from 'react';
import { createField } from '../../dist/';

class Notification extends Component {
  id = 0;

  componentDidMount() {
    this.props.setField( {value: [], showing: []} );
  }

  componentDidUpdate() {
    this.addToShowingList();
    this.handleShowingList();
  }

  addToShowingList = () => {
    const { getField, setField } = this.props;
    const value = getField().value;

    if( value.length > 0 ) {
      const showing = getField().showing;

      for (let v of value) {
        showing.push( {...v, id: ++this.id} )
      }

      setField( {value: [], showing} );
    }
  }

  handleShowingList = () => {
    const { getField, setField } = this.props;
    let showing = getField().showing;

    if( showing.length > 0 ) {
      let handledNewOne = false;

      showing = showing.map( item => {

        if( !item.showing ) {
          setTimeout( () => this.timeoutNotification( item ), item.timer || 5000);

          item.showing = true;
          handledNewOne = true;
        }

        return item;
      } );

      if( handledNewOne ) {
        setField( {showing} );
      }
    }
  }

  timeoutNotification = ( item ) => {
    const { getField, setField } = this.props;
    const showing = getField().showing.filter( i => i.id !== item.id );
    setField( {showing} );
  }

  render() {

    const value = this.props.getField();

    return (
      <div>
          {JSON.stringify( value )}
      </div>
    );
  }
}

export default createField( Notification );
