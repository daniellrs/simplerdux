import React, { Component } from 'react'

import simplerdux from '../../dist/'
import Child2 from './Child2';

export class Child extends Component {
  render() {
    console.log('renderizado')
    return (
      <div>
        {simplerdux.getState().message}
        <Child2 />
      </div>
    )
  }
}

export default Child
