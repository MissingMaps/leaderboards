import createClass from 'create-react-class';
import R from 'ramda';
import React from 'react';
import {Router, Route, Switch} from 'react-router';

import HashtagNav from '../containers/HashtagNav.js';
import HashtagStats from '../components/HashtagStats.js';
import Leaderboard from '../components/Leaderboard.js';
import LeaderboardMap from '../components/Leaderboard-map.js';

import "../assets/styles/table.css";
import "../assets/styles/table-osm.css";
import "../assets/styles/main.css";

export default createClass({
  getInitialState: function () {
    return {
      colors: {},
      hashtags: {},
      intervals: {},
      lastRefresh: ''
    };
  },
  initializeIntervals: function (props) {
    const { match: { params: { id } } } = this.props;

    var hashtags = R.split(',', id);
    var colorClasses = ['redteam', 'blueteam', 'greenteam'];

    var intervals = {};
    var colors = {};
    var component = this;
    hashtags.forEach(function (hashtag, index) {
      intervals[hashtag] = setInterval(() => {
        component.fetchData(hashtag);
      }, 30000);
      component.fetchData(hashtag);
      colors[hashtag] = colorClasses[index];
    });

    component.setState({
      intervals: intervals,
      colors: colors
    });
  },
  fetchData: function (hashtag) {
    var component = this;
    return fetch('https://osmstats.redcross.org/hashtags/' +
                 hashtag + '/users')
    .then(function (res) {
      return res.json();
    })
    .then(function (hashtagResult) {
      return fetch('https://osmstats.redcross.org/hashtags/' +
                   hashtag + '/map')
      .then(function (res) {
        return res.json();
      })
      .then(function (mapResult) {
        var state = component.state;
        state.hashtags[hashtag] = {
          users: hashtagResult,
          features: mapResult
        };
        component.setState(state);
      });
    });
  },
  componentDidMount: function () {
    this.initializeIntervals(this.props);
  },
  componentWillReceiveProps: function (nextProps) {
    const { match: { params: { id } } } = nextProps;

    var newHashtags = R.split(',', id);
    var currentHashtags = Object.keys(this.state.hashtags);
    if (newHashtags.length < currentHashtags.length) {
      this.handleHashtagDelete(R.difference(currentHashtags, newHashtags));
    } else if (newHashtags.length > currentHashtags.length) {
      this.handleHashtagAdd(R.difference(newHashtags, currentHashtags));
    } else {
      var deletes = R.difference(currentHashtags, newHashtags);
      var additions = R.difference(newHashtags, currentHashtags);
      if (deletes.length) {
        this.handleHashtagDelete(deletes);
      }

      if (additions.length) {
        this.handleHashtagAdd(additions);
      }
    }
  },
  handleHashtagDelete: function (hashtags) {
    var component = this;
    hashtags.forEach(function (hashtag) {
      var state = component.state;
      delete state.hashtags[hashtag];
      delete state.colors[hashtag];
      clearInterval(state.intervals[hashtag]);
      component.setState(state);
    });
  },
  handleHashtagAdd: function (hashtags) {
    var component = this;
    var colorClasses = ['redteam', 'blueteam', 'greenteam'];
    hashtags.forEach(function (hashtag) {
      var intervals = component.state.intervals;
      var colors = component.state.colors;
      var interval = setInterval(() => {
        component.fetchData(hashtag);
      }, 30000);
      component.fetchData(hashtag);
      var currentColors = R.values(colors);
      var toPick = R.difference(colorClasses, currentColors);
      colors[hashtag] = toPick[0];
      intervals[hashtag] = interval;
      component.setState({
        intervals: intervals,
        colors: colors
      });
    });
  },
  render: function () {
    var users = {}; var features = {};
    var hashtags = this.state.hashtags;
    Object.keys(hashtags).forEach((hashtag) => {
      users[hashtag] = hashtags[hashtag].users;
      features[hashtag] = hashtags[hashtag].features;
    });

    const { history, match: { params: { id } } } = this.props;

    return (
      <div>
        <div>
          <div id = "Page-Container">
            <HashtagNav
              id={id}
              history={this.props.history}
              location={this.props.location}
            />
            <HashtagStats
              colors={this.state.colors}
              rows={users}
              refresh={this.state.lastRefresh}
              id={id}
              history={this.props.history}
              location={this.props.location}
            />

            <Router history={history}>
              <Switch>
                <Route path="/:id/map" render={props => <LeaderboardMap colors={this.state.colors} rows={users} features={features} {...props} />} />
                <Route render={props => <Leaderboard colors={this.state.colors} rows={users} features={features} {...props} />} />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
});
