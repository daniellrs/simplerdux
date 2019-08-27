import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'

import Simplerdux from '../../dist/'

ReactDOM.render(<Simplerdux.Provider app={App} />, document.getElementById('root'))
