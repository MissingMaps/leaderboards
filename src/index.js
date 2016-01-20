import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect} from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import Layout from './containers/Layout.js';

var history = createHashHistory({
  queryKey: false
});

ReactDOM.render((
  <Router history={history}>
    <Redirect from="/" to="/missingmaps" />
    <Route path="/:id" component={Layout}>
    </Route>
  </Router>),
  document.getElementById('app')
);
