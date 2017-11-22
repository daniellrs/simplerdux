import React, { Component } from 'react';
import { connect } from 'react-redux';

const fieldsState = ( WrappedComponent ) => {

  class HOCComponent extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = ( state ) => {
    const fields = state['fieldsReduxReducer'] ? state['fieldsReduxReducer'].fields : state.fields;

    return { fields };
  }

  return connect( mapStateToProps )( HOCComponent );
}

export default fieldsState;
