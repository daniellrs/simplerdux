# Simplerdux

Simplerdux is a library to help you to create components or just put things in redux in a simpler way.
With Simplerdux you don't need to create reducer.js and action.js files, just let Simplerdux deal with that for you.

## Usage

Here is what you need to do to make it work.
**You need to have redux and react-redux installed in your project.**

### 1. Install the package

```
npm install simplerdux --save
or
yarn add simplerdux
```
### 2. Pass store to Simplerdux

  If you don't have any other reducer, then you can do that:
```
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { fieldsReduxStore, fieldsReduxReducer } from 'simplerdux';

const store = createStore(fieldsReduxReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

fieldsReduxStore.setStore( store );

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
```

If you already have a reducer, use combineReducers from redux and put fieldsReduxReducer inside with your reducer.
Note that the name passed in the combineReducers must be "fieldsReduxReducer".

And don't forget to pass the store to fieldsReduxStore.setStore( store ).

### 3. Create a example component

Here we will create a Simple Input component.

```
import React, { Component } from 'react';
import { createField } from 'simplerdux';

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
import { getObjectFieldsKey } from 'simplerdux';

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

Then the component will be able to receive 4 props:

| Props       | type           | Cool  |
| ------------- |:-------------:| ------------- |
| field      | string | field is a required field. Is the name of the field. |
| defaultFieldValue      | string | default value of the field. |
| fieldDidUpdate | function      |    fieldDidUpdate listen any change in the field object and return it. |
| destroyOnUnmount | boolean      |    If destroyOnUnmount is false, redux will keep the value of the component and when he mount again, the value is still be there. default = true.   |

### 4. Putting something at reducer state

We don't need to use Simplerdux just to create components, we can use to store any information at any time.

If we want to put something at reducer state to take back after a while we can do that:

```
import { getField, setField } from 'simplerdux';

...

storeSomeToken = ( token ) => {
  setField( 'someToken', token );
}

getTokenBack = () => {
  return getField( 'someToken' ).value;
}
```

### 5. Simplerdux functions

Here is all the available Simplerdux functions that you can import.

**`createField( component )`**
This is a high order component and is used to create components and provide multiple useful functions in the props of these components.

**`fieldsState( component )`**
This is a high order component and is used to provide multiple useful functions in the props of a component. Besides that is used to rerender a component when some field changes.

**`getField( field(String) )`**
Function used to get the object of a field.

```
const someInput = getField( 'someField' );

console.log( someInput ); // {value: 'Some input value'}
```

**`setField( field(String), obj(String, Number, Boolean, Object, Array) )`**
Function used to set value of a field (works like setState, but with the name of the field in the first parameter). If the second parameter isn't an object then the value passed will update the value of the field object.

```
setField( 'someInput', {value: 'This is the input value', error: 'There is some error message in that input'} );
// {value: 'This is the input value', error: 'There is some error message in that input'}

setField( 'someInput', 'This is the new value of the input' );
// {value: 'This is the new value of the input', error: 'There is some error message in that input'}
```

**`getObjectFieldsKey( partOfField(String), key(String) )`**
Create a object of multiple fields. The default value of key is 'value'.

```
setField( 'person.name', 'Dylan' );
setField( 'person.age', 35 );

const objPerson = getObjectFieldsKey( 'person' );

console.log( objPerson ); // {name: 'Dylan', age: 35}
```

**`setObjectFieldsValue( partOfField(String), obj(Object), key(String), ...recursive )`**
Set the value of multiple fields of an object. The default value of key is 'value'. The recursive option is optional and will enter in different levels of the object, if you want to enter 3 levels deep of the object then you will call 'setObjectFieldsValue( 'person', obj, true, true, true );'.

```
const obj = {name: 'Brian', age: 29};

setObjectFieldsValue( 'person', obj );

console.log( getField( 'person.name' ) ); // {value: 'Brian'}
console.log( getField( 'person.age' ) ); // {value: 29}
```

**`destroyField( field(String) )`**
Clear the specified field.

**`getAllFields( field(String) )`**
Return all fields.

**`clearAllFields()`**
Clear all fields.

**`getDefinedPropsField( field(String), prevFieldProps(Object) )`**
This function is used inside componentDidUpdate() or componentWillUpdate() function and is used to get the previous or the next value of a field.

```
componentDidMount() {
  setField( 'someInput', 'Hello World' );

  setTimeout( () => {
      setField( 'someInput', 'Hello Redux' );
  }, 1000);
}

componentDidUpdate( prevProps ) {
  const input = getField( 'someInput' );
  const prevInput = getDefinedPropsField( 'someInput', prevProps.fields );

  console.log( input ); // {value: 'Hello Redux'}
  console.log( prevInput ); // {value: 'Hello World'}
}

...

export default fieldsState( Component ); // inject 'fields' props in the component
```
