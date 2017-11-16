const reducers = ( state = { fields: {} }, action ) => {

  switch ( action.type ) {
    case 'setFields':
      return {
        ...state,
        fields: {...action.fields}
      }
    case 'clearAllFields':
      return {
        ...state,
        fields: {}
      }
    default:
      return state;
  }
}

export default reducers;
