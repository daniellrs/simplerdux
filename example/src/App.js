import React, { Component } from 'react'

import simplerdux from '../../dist/'
import Child from './Child';

class App extends Component {

  componentDidMount() {
    simplerdux.setState({message: 'TEST1'}, true)

    setInterval(() => {
      simplerdux.setState({message: 'TEST2'}, true)
    }, 3000)
  }

  render () {
    return (
      <div>
        {simplerdux.getState().message}
        <Child />
      </div>
    )
  }
}

export default App