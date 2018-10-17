import React, { Component } from 'react';
import { fieldsState } from '../../dist';

class Hoho extends Component {

  componentDidMount() {
    setTimeout(() => {

        // console.log( this.props.setField( 'kkk' ) );
    }, 3000);
  }

  render() {
    const { field } = this.props;

    return <span>{field}</span>
  }
}

export default fieldsState( Hoho )
