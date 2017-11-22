import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initializeField, fieldChangeListener, destroyField, getField, setField } from './fieldsRedux';

const createField = ( WrappedComponent ) => {

  class HOCComponent extends Component {

    componentDidMount() {
      const { field, defaultValue } = this.props;
      initializeField( field, defaultValue );
    }

    componentDidUpdate(prevProps, prevState) {
      const {field, fieldDidUpdate} = this.props;
      fieldChangeListener(field, fieldDidUpdate, prevProps.fields);
    }

    componentWillUnmount() {
      const { field, destroyOnUnmount = true } = this.props;

      if( destroyOnUnmount ) {
        destroyField( field );
      }
    }

    getField = ( field ) => {
      return field ? getField( field ) : getField( this.props.field );
    }

    setField = ( p1, p2 ) => {
      const value = typeof p1 === 'object';
      setField( value ? this.props.field : p1, value ? p1 : p2 );
    }

    render() {
      return <WrappedComponent getField={this.getField} setField={this.setField} {...this.props} />;
    }
  }

  HOCComponent.propTypes = {
    field: PropTypes.string.isRequired,
    defaultValue: PropTypes.oneOfType([ PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.array ]),
    fieldDidUpdate: PropTypes.func,
    destroyOnUnmount: PropTypes.bool
  }

  const mapStateToProps = ( state ) => {
    const fields = state['fieldsReduxReducer'] ? state['fieldsReduxReducer'].fields : state.fields;

    return { fields };
  }

  return connect( mapStateToProps )( HOCComponent );
}

export default createField;
