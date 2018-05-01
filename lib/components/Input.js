import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-maskedinput';
import { createField } from '../';

class Input extends Component {
  confs = '';

  onChange = ( event ) => {
    const { onChange, setField } = this.props;

    let value = this.handleValue( event.target );
    value = this.handleWithTypeValues( value );

    if ( onChange ) {
      onChange( value );
    }

    setField( {value} );
  }

  handleValue = ( target ) => {
    const confs = this.stateOptions();
    return confs.alias === 'check' ? target.checked : target.value;
  }

  handleWithTypeValues = ( value ) => {
    const { field, type, optionValue, getField } = this.props;

    if( type === 'checkbox' ) {
      const fieldValue = getField( field ).value || [];
      const index = fieldValue.indexOf( optionValue );

      if( index < 0 ) {
        fieldValue.push( optionValue );
      } else {
        fieldValue.splice(index, 1);
      }

      value = fieldValue;
    }

    if( type === 'radio' ) {
      value = optionValue;
    }

    return value;
  }

  events = ( ) => {
    const { onFocus, onBlur, onKeyDown, onKeyPress, onKeyUp, onMouseEnter, onMouseOver, onMouseMove, onMouseDown, onMouseUp, onClick, onDoubleClick, onMouseLeave, onMouseOut } = this.props;
    const onChange = this.onChange;
    return { onChange, onFocus, onBlur, onKeyDown, onKeyPress, onKeyUp, onMouseEnter, onMouseOver, onMouseMove, onMouseDown, onMouseUp, onClick, onDoubleClick, onMouseLeave, onMouseOut };
  }

  checkInputProps = ( ) => {
    const { field, id, type = 'text', name = '', className = '', placeholder, min, max, step, maxLength, minLength, autoFocus, disabled, readOnly, required, style = {}, optionValue, getField } = this.props;

    const confs = this.stateOptions( );

    let value = getField( field ).value;

    let inputProps = {};

    switch ( confs.alias ) {
      case 'button':
        break;
      case 'check':
        inputProps['checked'] = value ? value.indexOf( optionValue ) < 0 ? false : true : false;
        break;
      case 'color':
        inputProps['value'] = value;
        break;
      case 'hidden':
        inputProps['value'] = value;
        break;
      default:
        inputProps['min'] = min;
        inputProps['max'] = max;
        inputProps['step'] = step;
        inputProps['maxLength'] = maxLength;
        inputProps['minLength'] = minLength;
        inputProps['value'] = value || '';
        inputProps['placeholder'] = placeholder;
    }

    inputProps['readOnly'] = readOnly;
    inputProps['required'] = required;
    inputProps['disabled'] = disabled;
    inputProps['autoFocus'] = autoFocus;
    inputProps['id'] = id;
    inputProps['type'] = type;
    inputProps['name'] = name;
    inputProps['className'] = className;
    inputProps['style'] = style;

    inputProps = {
      ...inputProps,
      ...this.events()
    }

    return inputProps;
  }

  stateOptions = ( ) => {
    const { confs } = this;
    const { type } = this.props;

    if ( confs ) {
      return confs;
    }

    const confsAux = {};

    switch ( type ) {
      case 'time':
        confsAux['alias'] = 'text';
        break;
      case 'date':
        confsAux['alias'] = 'text';
        break;
      case 'datetime-local':
        confsAux['alias'] = 'text';
        break;
      case 'email':
        confsAux['alias'] = 'text';
        break;
      case 'url':
        confsAux['alias'] = 'text';
        break;
      case 'month':
        confsAux['alias'] = 'text';
        break;
      case 'week':
        confsAux['alias'] = 'text';
        break;
      case 'number':
        confsAux['alias'] = 'text';
        break;
      case 'password':
        confsAux['alias'] = 'text';
        break;
      case 'search':
        confsAux['alias'] = 'text';
        break;
      case 'button':
        confsAux['alias'] = 'button';
        break;
      case 'submit':
        confsAux['alias'] = 'button';
        break;
      case 'file':
        confsAux['alias'] = 'button';
        break;
      case 'checkbox':
        confsAux['alias'] = 'check';
        break;
      case 'radio':
        confsAux['alias'] = 'check';
        break;
      case 'color':
        confsAux['alias'] = 'color';
        break;
      case 'hidden':
        confsAux['alias'] = 'hidden';
        break;
      case 'range':
        confsAux['alias'] = 'range';
        break;
      default:
        confsAux['alias'] = 'text';
    }

    this.confs = confsAux;

    return confsAux;
  }

  render() {
    const { mask } = this.props;

    const inputProps = this.checkInputProps();

    return !mask
      ? ( <input {...inputProps}/> )
      : ( <MaskedInput mask={mask} {...inputProps}/> );
  }
}

Input.propTypes = {
  field: PropTypes.string.isRequired,
  fieldDidUpdate: PropTypes.func,
  destroyOnUnmount: PropTypes.bool,
  onChange: PropTypes.func,
  mask: PropTypes.string,
  type: PropTypes.oneOf([
    'time',
    'date',
    'datetime-local',
    'email',
    'url',
    'month',
    'week',
    'number',
    'password',
    'search',
    'button',
    'submit',
    'file',
    'checkbox',
    'radio',
    'color',
    'hidden',
    'range',
    'text'
  ]),
  placeholder: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  step: PropTypes.string,
  maxLength: PropTypes.string,
  minLength: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseOut: PropTypes.func
}

export default createField( Input );
