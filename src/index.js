import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect, Switch} from 'react-router';
import createHistory from 'history/createHashHistory';
import App from './containers/App.js';

var history = createHistory({
  queryKey: false
});

ReactDOM.render((
  <Router history={history}>
    <Switch>
      <Route path="/" exact render={props => <Redirect to="/missingmaps" />} />
      <Route path="/:id" component={App} />
    </Switch>
  </Router>),
  document.getElementById('root')
);
