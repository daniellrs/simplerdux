import React from 'react'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

export default class Simplerdux {
  static localStoragePersistenceName = 'simplerdux-persistence'
  static store = undefined

  static actions = {
    setState: (state) => {
      return {type: 'setState', state}
    },
    clearState: () => {
      return {type: 'clearState'}
    }
  }

  static reducer = ( state = { simplerdux: {} }, action ) => {
    switch ( action.type ) {
      case 'setState':
        return {
          ...state,
          simplerdux: {...state.simplerdux, ...action.state}
        }
      case 'clearState':
        return {
          ...state,
          simplerdux: {}
        }
      default:
        return state
    }
  }

  static setStore = providedStore => {
    Simplerdux.store = providedStore
    Simplerdux.restorePersistedState()
  }

  static getStore = () => {
    return Simplerdux.store
  }

  static restorePersistedState = () => {
    if(!Simplerdux.store) {
      console.error('You have to set simplerdux store before call restorePersistedState()')
      return
    }

    const persistence = JSON.parse(localStorage.getItem(Simplerdux.localStoragePersistenceName) || '{}')
    Simplerdux.store.dispatch(Simplerdux.actions.setState(persistence))
  }

  static getState = () => {
    if(!Simplerdux.store) {
      console.error('You have to set simplerdux store before call getState()')
      return
    }

    return Simplerdux.store.getState()['simplerdux']
  }

  static setState = (data, persist) => {
    if(!Simplerdux.store) {
      console.error('You have to set simplerdux store before call setState()')
      return
    }
    
    if(persist) {
      const persistence = JSON.parse(localStorage.getItem(Simplerdux.localStoragePersistenceName) || '{}')
      localStorage.setItem(Simplerdux.localStoragePersistenceName, JSON.stringify({...persistence, ...data}))
    }

    Simplerdux.store.dispatch(Simplerdux.actions.setState(data))
  }

  static clearState = () => {
    if(!Simplerdux.store) {
      console.error('You have to set simplerdux store before call clearState()')
      return
    }

    Simplerdux.store.dispatch(Simplerdux.actions.clearState())
    localStorage.removeItem(Simplerdux.localStoragePersistenceName)
  }

  static bind = ( Component ) => {

    class SimplerduxComponent extends React.Component {
  
      render() {
        return (
          <Component
            {...this.props} 
          />
        )
      }
    }
  
    const mapStateToProps = (state) => {
      return {simplerdux: state['simplerdux']}
    }
  
    return connect( mapStateToProps )( SimplerduxComponent )
  }

  static Provider = ({app}) => {

    const store = createStore(Simplerdux.reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    Simplerdux.setStore(store)
    
    const AppComponent = Simplerdux.bind(app)

    return (
      <Provider store={store}>
        <AppComponent />
      </Provider>
    )
  }
}

window.simplerdux = Simplerdux