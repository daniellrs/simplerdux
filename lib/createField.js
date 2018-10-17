import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initializeField, fieldChangeListener, destroyField, getField, setField, getObjectFieldsKey, getDefinedPropsField, setObjectFieldsValue } from './fieldsRedux';

const createField = ( WrappedComponent ) => {

  class HOCComponent extends Component {

    componentDidMount() {
      const { field, defaultFieldValue } = this.props;

      if( field ) {
        initializeField( field, defaultFieldValue );
      }
    }

    componentDidUpdate(prevProps, prevState) {
      const {field, fieldDidUpdate} = this.props;

      if( field ) {
        fieldChangeListener(field, fieldDidUpdate, prevProps.fields);
      }
    }

    componentWillUnmount() {
      const { field, destroyOnUnmount = true } = this.props;

      if( field && destroyOnUnmount ) {
        destroyField( field );
      }
    }

    getField = ( field ) => {
      return field ? getField( field ) : getField( this.props.field );
    }

    setField = ( p1, p2 ) => {
      if( typeof p2 === 'undefined' ) {
        setField( this.props.field, p1 );
      } else {
        setField( p1, p2 );
      }
    }

    destroyField = ( field ) => {
      destroyField( field ? field : this.props.field );
    }

    getDefinedPropsField = ( p1, p2 ) => {
      if( typeof p2 === 'undefined' ) {
        return getDefinedPropsField( this.props.field, p1 );
      } else {
        return getDefinedPropsField( p1, p2 );
      }
    }

    render() {
      return <WrappedComponent
          getField={this.getField}
          setField={this.setField}
          destroyField={this.destroyField}
          getDefinedPropsField={this.getDefinedPropsField}
          getObjectFieldsKey={getObjectFieldsKey}
          setObjectFieldsValue={setObjectFieldsValue}
          {...this.props} />;
    }
  }

  HOCComponent.propTypes = {
    field: PropTypes.string,
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
