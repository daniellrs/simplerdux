# Simplerdux

Simplerdux is a library to help you to put things in redux in a simpler way. Beside that you can easily persist data between browser refreshes.
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

### 2. Initialize Simplerdux in your app

Do that in index.js file:

```
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import Simplerdux from 'simplerdux'

ReactDOM.render(<Simplerdux.Provider app={App} />, document.getElementById('root'))

```

### 3. Now just use it!

You can call Simplerdux global state on any Component of your application.

```
import Simplerdux from 'simplerdux'

class App extends Component {

  componentDidMount() {
    Simplerdux.setState({message: 'Simplerdux is working!'})
  }

  render () {
    return (
      <div>
        {Simplerdux.getState().message}
      </div>
    )
  }
}
```

### 4. If you want that the data persist

Pass true as second parameter in setState.

```
import Simplerdux from 'simplerdux'

class App extends Component {

  componentDidMount() {
    Simplerdux.setState({message: 'This data will persist'}, true)
  }

  render () {
    return (
      <div>
        {Simplerdux.getState().message}
      </div>
    )
  }
}
```

## Simplerdux properties

| Method       | Description  |
| ------------- | ------------- |
| setState(data, persist)      | Set data to Simplerdux state. First param is the data. Second param tells to Simplerdux if the data should persist. |
| getState()      | Returns an object with the stored data. |
| clearState()      | Clears all data. |
| cleanPersistedState()      | Clears all persisted data. |
