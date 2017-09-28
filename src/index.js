import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect, IndexRoute} from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import App from './containers/App.js';
import Leaderboard from './components/Leaderboard.js';
import LeaderboardMap from './components/Leaderboard-map.js';

var history = createHashHistory({
  queryKey: false
});

ReactDOM.render((
  <Router history={history}>
    <Redirect from="/" to="/missingmaps" />
    <Route path="/:id" component={App}>
      <IndexRoute component={Leaderboard} />
      <Route path="/:id/map" component={LeaderboardMap} />
    </Route>
  </Router>),
  document.getElementById('root')
);
