import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect, IndexRoute} from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import App from './containers/App.js';
import Leaderboard from './components/Leaderboard.js';

var history = createHashHistory({
  queryKey: false
});

ReactDOM.render((
  <Router history={history}>
    <Redirect from="/" to="/MissingMaps" />
    <Route path="/:id" component={App}>
      <IndexRoute component={Leaderboard} />
    </Route>
  </Router>),
  document.getElementById('app')
);
