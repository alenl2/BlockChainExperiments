import 'semantic-ui-css/semantic.min.css';

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Admin from './App'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' component={Admin}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
