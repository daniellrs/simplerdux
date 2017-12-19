import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getField, setField, destroyField, getObjectFieldsKey, getDefinedPropsField } from './fieldsRedux';

const fieldsState = ( WrappedComponent ) => {

  class HOCComponent extends Component {

    getField = ( field ) => {
      return getField( field );
    }

    setField = ( field, value ) => {
      setField( field, value );
    }

    destroyField = ( field ) => {
      destroyField( field );
    }

    getDefinedPropsField = ( field, props ) => {
      return getDefinedPropsField( field, props );
    }

    getObjectFieldsKey = ( field, key ) => {
      return getObjectFieldsKey( field, key );
    }

    render() {
      return <WrappedComponent
          getField={this.getField}
          setField={this.setField}
          destroyField={this.destroyField}
          getDefinedPropsField={this.getDefinedPropsField}
          getObjectFieldsKey={this.getObjectFieldsKey}
          {...this.props} />;
    }
  }

  const mapStateToProps = ( state ) => {
    const fields = state['fieldsReduxReducer'] ? state['fieldsReduxReducer'].fields : state.fields;

    return { fields };
  }

  return connect( mapStateToProps )( HOCComponent );
}

export default fieldsState;
