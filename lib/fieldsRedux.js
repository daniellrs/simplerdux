import * as fieldsRedux from './actions';
import store from './fieldsReduxStore';

export const initializeField = ( field ) => {

  const fieldObject = getField( field );

  if( !fieldObject.initialized ) {

    const fieldValue = {
      initialized: true,
      value: fieldObject.value,
      type: 'field'
    }

    setField( field, fieldValue );
  }

}

export const getObjectFieldsKey = ( field, key ) => {

  const fieldObject = getField( field );

  const obj = {};

  objectFieldsKeyFinder( obj, fieldObject, key );

  return obj;
}

const objectFieldsKeyFinder = ( obj, fieldObject, key ) => {
  Object.keys(fieldObject).map(k => {
    if( fieldObject[k].type === 'field' ) {
      obj[k] = fieldObject[k][key];
    }
    if( typeof fieldObject[k] === 'object' ) {
      objectFieldsKeyFinder( obj, fieldObject[k], key );
    }
    return undefined;
  });
}

export const fieldChangeListener = ( field, fieldDidUpdate, prevProps ) => {

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

export const getField = ( field ) => {
  return reduxField( field );
}

export const setField = ( field, value ) => {
  return reduxField( field, value );
}

export const destroyField = ( field ) => {
  return reduxField( field, undefined, 'remove' );
}

export const getDefinedPropsField = ( field, props ) => {
  return reduxField( field, undefined, props );
}

export const clearAllFields = ( ) => {
  store.getStore().dispatch(fieldsRedux.clearAllFields( ));
}

export const getAllFields = ( ) => {
  const fields = getStoreState().fields;
  return fields;
}

const reduxField = ( field, value, propAux ) => {

  let fields = typeof propAux === 'object'
              ? propAux
              : getStoreState().fields;
  fields = JSON.parse(JSON.stringify(fields));

  const path =  field.split(".");
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
      } else if( typeof propAux === 'string' && propAux === 'remove' ) {
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

  if( value || (typeof propAux === 'string' && propAux === 'remove') ) {
    store.getStore().dispatch(fieldsRedux.setFields( fields ));
  }

  return fieldObject;
}

const getStoreState = () => {
  return store.getStore().getState()['fieldsReduxReducer'] ? store.getStore().getState()['fieldsReduxReducer'] : store.getStore().getState();
}
