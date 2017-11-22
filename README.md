# fields-redux

Fields-redux is used to save the state of your React components in Redux.

## Usage

Here is what you need to do to make it work.
**Of course you need to have redux and react-redux installed in your project.**

### 1. Install the package

```
npm install fields-redux --save
or
yarn add fields-redux
```
### 2. Pass store to fields-redux

  If you don't have any other reducer, then you can do that:
```
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { fieldsReduxStore, fieldsReduxReducer } from 'fields-redux';
import { Provider } from 'react-redux';

const store = createStore(fieldsReduxReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

fieldsReduxStore.setStore( store );

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
```

If you already have a reducer, use combineReducers from redux and put fieldsReduxReducer inside with your reducer.
Note that the name passed in the combineReducers must be "fieldsReduxReducer".

And don't forget to pass the store to fieldsReduxStore.setStore( store ).


### 2. Create a component

Here we will create a Simple Input component.

```
import React, { Component } from 'react';
import { createField } from './lib';

class Input extends Component {
  render() {

    const value = this.props.getField().value || '';

    return (
      <div>
        <input value={value} onChange={e => this.props.setField( {'value': e.target.value} )} />
      </div>
    );
  }
}

export default createField( Input );
```

Then we can use our new component like that:
```
import React, { Component } from 'react';
import Input from './Input';
import { getObjectFieldsKey } from 'fields-redux';

class App extends Component {

  sendLogin = () => {

    const { email, senha } = getObjectFieldsKey('login', 'value');

    console.log( email, senha );
  }

  render() {

    return (
      <div>
        <Input field='login.email' />
        <Input field='login.senha' />

        <button onClick={this.sendLogin}>Login</button>
      </div>
    );
  }
}

export default App;
```

## Component properties

When we create a component, we need to use createField( component ).

Then the component will receive 4 props:

| Props       | type           | Cool  |
| ------------- |:-------------:| ------------- |
| field      | string | field is a required field. Is the name of the field. |
| defaultValue      | string, number, array, object, boolean      | defaultValue is the initial value of the component.   |
| fieldDidUpdate | function      |    fieldDidUpdate listen any change in the field object and return it. |
| destroyOnUnmount | boolean      |    If destroyOnUnmount is false, redux will keep the value of the component and when he mount again, the value is still be there. default = true.   |
