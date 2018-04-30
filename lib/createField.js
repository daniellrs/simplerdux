import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initializeField, fieldChangeListener, destroyField, getField, setField, getObjectFieldsKey, getDefinedPropsField } from './fieldsRedux';

const createField = ( WrappedComponent ) => {

  class HOCComponent extends Component {

    componentDidMount() {
      const { field } = this.props;
      initializeField( field );
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

    destroyField = ( field ) => {
      destroyField( field ? field : this.props.field );
    }

    getDefinedPropsField = ( p1, p2 ) => {
      return getDefinedPropsField( p2 ? p1 : this.props.field, p2 ? p2 : p1 );
    }

    getObjectFieldsKey = ( p1, p2 ) => {
      return getObjectFieldsKey( p2 ? p1 : this.props.field, p2 ? p2 : p1 );
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

  HOCComponent.propTypes = {
    field: PropTypes.string.isRequired,
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
