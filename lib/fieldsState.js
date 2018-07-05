import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getField, setField, destroyField, getObjectFieldsKey, getDefinedPropsField, setObjectFieldsValue } from './fieldsRedux';

const fieldsState = ( WrappedComponent ) => {

  class HOCComponent extends Component {

    render() {
      return <WrappedComponent
          getField={getField}
          setField={setField}
          destroyField={destroyField}
          getDefinedPropsField={getDefinedPropsField}
          getObjectFieldsKey={getObjectFieldsKey}
          setObjectFieldsValue={setObjectFieldsValue}
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
