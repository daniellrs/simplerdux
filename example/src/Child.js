import React, { Component } from 'react'

import Simplerdux from '../../dist/'
import Child2 from './Child2'

export default class Child extends Component {

  componentDidMount() {
    Simplerdux.setState({m: 'Simplerdux is working!'}, true)
  }

  render () {
    return (
      <div>
        {Simplerdux.getState().m}
        <Child2 />
      </div>
    )
  }
}
