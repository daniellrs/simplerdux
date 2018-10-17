import * as fieldsRedux from './actions';
import store from './fieldsReduxStore';

export const initializeField = ( field, defaultFieldValue ) => {

  if( !field ) {
    console.error( 'A field name must be declared (simplerdux internal function initializeField)' );
    return;
  }

  const fieldObject = getField( field );

  if( !fieldObject.initialized ) {

    const fieldValue = {
      initialized: true,
      value: fieldObject.value || defaultFieldValue
    }

    setField( field, fieldValue );
  }

}

export const getObjectFieldsKey = ( field, key='value' ) => {

  if( !field ) {
    console.error( 'A field name must be declared (simplerdux internal function getObjectFieldsKey)' );
    return;
  }

  const fieldObject = getField( field );
  const obj = {};

  objectFieldsKeyFinder( obj, fieldObject, key );

  return obj;
}

export const setObjectFieldsValue = ( field, obj, ...recursive ) => {

  if( !field ) {
    console.error( 'A field name must be declared (simplerdux internal function setObjectFieldsValue)' );
    return;
  }

  Object.keys( obj ).map( k => {
    if( recursive.length === 0 || !recursive[0] || typeof obj[k] !== 'object' ) {

      if( typeof obj[k] !== 'object' || Array.isArray( obj[k] ) ) {
        setField( `${field}.${k}`, obj[k] );
      }
    } else {
      recursive.shift();
      setObjectFieldsValue( `${field}.${k}`, obj[k], ...recursive );
    }
  } );
}

const objectFieldsKeyFinder = ( obj, fieldObject, key ) => {
  Object.keys( fieldObject ).map( k => {
    if( fieldObject[k] && fieldObject[k][key] ) {
      obj[k] = fieldObject[k][key];
    }
    if( typeof fieldObject[k] === 'object' ) {
      objectFieldsKeyFinder( obj, fieldObject[k], key );
    }
    return undefined;
  } );
}

export const fieldChangeListener = ( field, fieldDidUpdate, prevProps ) => {

  if( !field ) {
    console.error( 'A field name must be declared (simplerdux internal function fieldChangeListener)' );
    return;
  }

  if( fieldDidUpdate ) {

    const fieldObject = getField( field );
    const prevFieldAux = getDefinedPropsField( field, prevProps );

    let changed = false;

    Object.keys( fieldObject ).map(key => {
      if( fieldObject[key] !== prevFieldAux[key] && typeof fieldObject[key] !== 'object' ) {
        changed = true;
      }
      return undefined;
    });

    if( changed ) {
      fieldDidUpdate(fieldObject, prevFieldAux);
    }
  }
}

export const getField = ( field, props ) => {

  if( !field ) {
    console.error( 'A field name must be declared (simplerdux internal function getField)' );
    return;
  }

  let fieldObject = {};
  const path = field.split( '.' );

  try {
    fieldObject = props || getAllFields();

    path.map( p => {
      fieldObject = fieldObject[p];
      return undefined;
    } );

  } catch (e) {}

  return fieldObject || {};
}

export const setField = ( field, value ) => {

  if( !field ) {
    console.error( 'A field name must be declared (simplerdux internal function setField)' );
    return;
  }

  if( typeof value !== 'object' || Array.isArray( value ) ) {
    value = {value};
  }

  return reduxField( field, value );
}

export const destroyField = ( field ) => {

  if( !field ) {
    console.error( 'A field name must be declared (simplerdux internal function destroyField)' );
    return;
  }

  return reduxField( field, undefined, true );
}

export const getDefinedPropsField = ( field, props ) => {

  if( !field ) {
    console.error( 'A field name must be declared (simplerdux internal function getDefinedPropsField)' );
    return;
  }

  return getField( field, props );
}

export const clearAllFields = () => {
  store.getStore().dispatch(fieldsRedux.clearAllFields( ));
}

export const getAllFields = () => {
  return getStoreState().fields;
}

const reduxField = ( field, value, remove ) => {

  if( !field ) {
    console.error( 'A field name must be declared (simplerdux internal function reduxField)' );
    return;
  }

  let fields = {};
  const allFields = getAllFields() || {};
  Object.keys( allFields ).map( k => {
    fields[k] = {...allFields[k]};
    return undefined;
  } );

  const path =  field.split( '.' );
  let temp = {};
  let fieldObject;

  path.map( (part, index) => {

    if(index === (path.length-1)) {

      if( path.length === 1 ) {
        if (!fields[part]) {
          fields[part] = {};
        }
        temp = fields;
      }

      if( value ) {
        temp[part] = {...temp[part], ...value};
      } else if( remove ) {
        delete temp[part];
      }

      fieldObject = temp[part] ? temp[part] : {};

    } else if(index > 0) {
      if (!temp[part]) {
        temp[part] = {};
      }
      temp = temp[part];
    } else {
      if (!fields[part]) {
        fields[part] = {};
      }
      temp = fields[part];
    }

    return undefined;
  });

  if( value || remove ) {
    store.getStore().dispatch(fieldsRedux.setFields( fields ));
  }

  return fieldObject;
}

const getStoreState = () => {
  return store.getStore().getState()['fieldsReduxReducer'] ? store.getStore().getState()['fieldsReduxReducer'] : store.getStore().getState();
}
