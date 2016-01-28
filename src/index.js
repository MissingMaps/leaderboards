import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect, IndexRoute} from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import App from './containers/App.js';
import Leaderboards from './containers/Leaderboards.js';

var history = createHashHistory({
  queryKey: false
});

ReactDOM.render((
  <Router history={history}>
    <Redirect from="/" to="/missingmaps" />
    <Route path="/:id" component={App}>
      <IndexRoute component={Leaderboards} />
    </Route>
  </Router>),
  document.getElementById('app')
);
