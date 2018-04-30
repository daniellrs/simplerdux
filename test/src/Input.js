import React, { Component } from 'react';
import { createField } from '../../dist/';

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
