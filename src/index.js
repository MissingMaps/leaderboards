import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect} from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import Leaderboards from './containers/Leaderboards.js';

var history = createHashHistory({
  queryKey: false
});

ReactDOM.render((
  <Router history={history}>
    <Redirect from="/" to="/missingmaps" />
    <Route path="/:id" component={Leaderboards}>
    </Route>
  </Router>),
  document.getElementById('app')
);
