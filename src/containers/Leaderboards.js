import React from 'react';
import R from 'ramda';
import HashtagStats from '../components/HashtagStats.js';
import Leaderboard from '../components/Leaderboard.js';
import fetch from 'isomorphic-fetch';

export default React.createClass({
  getInitialState: function () {
    return {
      hashtags: {},
      intervals: []
    };
  },
  createIntervalsFromProps: function (props) {
    // Clear existing intervals
    R.map(clearInterval, this.state.intervals);
    this.state.hashtags = {};

    var colorClasses = ['redteam', 'blueteam', 'greenteam'];

    // Create new intervals
    var hashtags = R.split(',', props.params.id);
    R.map(this.createInterval, hashtags);

    // Not efficient use of setState
    var colors = R.zipObj(hashtags, colorClasses);
    this.setState({
      colors: colors
    });
  },
  createInterval: function (hashtag) {
    var component = this;
    var fetchData = () => {
      fetch('http://missingmaps-api.devseed.com/hashtags/' + hashtag + '/users')
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        var nextState = component.state;
        nextState.hashtags[hashtag] = json;
        component.setState(nextState);
      });
    };
    var interval = setInterval(fetchData, 30000);
    fetchData();
    this.state.intervals.push(interval);
  },
  componentDidMount: function () {
    if (process.env.NODE_ENV === 'development') {
      this.createIntervalsFromProps(this.props);
    }
  },
  componentWillReceiveProps: function (nextProps) {
    if (process.env.NODE_ENV === 'development') {
      this.createIntervalsFromProps(nextProps);
    }
  },
  render: function () {
    return (
      <div>
        <HashtagStats colors={this.state.colors} rows={this.state.hashtags}/>
        <Leaderboard colors={this.state.colors} rows={this.state.hashtags}/>
      </div>
    );
  }
});
