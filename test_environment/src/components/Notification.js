import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createField } from '../../../dist/';

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
    const { getField, setField, audio } = this.props;
    const value = getField().value;

    if( value.length > 0 ) {
      const showing = getField().showing;

      for (let v of value) {
        if( audio ) {
          var ad = new Audio( audio );
          ad.play();
        }

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
    const { getField, setField, disappearTimer } = this.props;

    const showing = getField().showing.map( i => {
      if( i.id === item.id )
        i.disappearing = true;
      return i;
    });
    setField( {showing} );

    setTimeout( () => {
      const showing = getField().showing.filter( i => i.id !== item.id );
      setField( {showing} );
    }, disappearTimer + 1000);
  }

  render() {
    const { popUps, getField, appearClass='', disappearClass='' } = this.props;
    const showing = getField().showing || [];

    return (
      <div className='sd-notification'>
          {showing.map( s =>
              <div key={s.id} className={`${appearClass} ${s.disappearing ? disappearClass : ''}`}>
                  {popUps[s.type] && popUps[s.type]( s )}
              </div>
          )}
      </div>
    );
  }
}

Notification.propTypes = {
  field: PropTypes.string.isRequired,
  fieldDidUpdate: PropTypes.func,
  destroyOnUnmount: PropTypes.bool,
  appearClass: PropTypes.string,
  disappearClass: PropTypes.string,
  disappearTimer: PropTypes.number,
  popUps: PropTypes.object,
}

export default createField( Notification );
