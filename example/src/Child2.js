import React, { Component } from 'react'

import Simplerdux from '../../dist/'

export class Child2 extends Component {
  render() {
    return (
      <div>
        {Simplerdux.getState().message}
      </div>
    )
  }
}

export default Child2
