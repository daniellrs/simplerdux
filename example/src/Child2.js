import React, { Component } from 'react'

import simplerdux from '../../dist/'

export class Child2 extends Component {
  render() {
    return (
      <div>
        {simplerdux.getState().message}
      </div>
    )
  }
}

export default Child2
