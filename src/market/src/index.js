import 'semantic-ui-css/semantic.min.css';

import './app.css'

import React from 'react'
import ReactDOM from 'react-dom'
import Root from './js/components/Root.react'
import Store from './js/store'

ReactDOM.render(
    <Root store={Store} />,
    document.getElementById('root')
  );