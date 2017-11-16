import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initializeField, fieldChangeListener, destroyField } from './reduxFields';

const createReduxField = ( WrappedComponent ) => {

  class HOCComponent extends Component {

    componentDidMount() {
      const { field, defaultValue } = this.props;
      initializeField( field, defaultValue );
    }

    componentDidUpdate(prevProps, prevState) {
      const {field, fieldListener} = this.props;
      fieldChangeListener(field, fieldListener, prevProps.fields);
    }

    componentWillUnmount() {
      const { field, destroyOnUnmount = true } = this.props;

      if( destroyOnUnmount ) {
        destroyField( field );
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  HOCComponent.propTypes = {
    field: PropTypes.string.isRequired,
    defaultValue: PropTypes.oneOfType([ PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.array ]),
    fieldListener: PropTypes.func,
    destroyOnUnmount: PropTypes.bool
  }

  const mapStateToProps = ( state ) => {
    return { fields: state.fields }
  }

  return connect( mapStateToProps )( HOCComponent );
}

export default createReduxField;
