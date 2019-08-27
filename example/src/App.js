import React, { Component } from 'react'

import Simplerdux from '../../dist/'
import Child from './Child';

class App extends Component {

  componentDidMount() {
    Simplerdux.setState({message: 'TEST1'})

    setInterval(() => {
      Simplerdux.setState({message: 'TEST2'}, true)
    }, 3000)
  }

  render () {
    return (
      <div>
        {Simplerdux.getState().message}
        <Child />
      </div>
    )
  }
}

export default App