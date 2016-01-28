import React from 'react';
import R from 'ramda';
import HashtagStats from '../components/HashtagStats.js';
import Leaderboard1 from '../components/Leaderboard-1.js';
import Leaderboard2 from '../components/Leaderboard-2.js';
import Leaderboard3 from '../components/Leaderboard-3.js';
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

    var colorClasses = ['hashtag1', 'hashtag2', 'hashtag3'];

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
    var interval = setInterval(() => {
      fetch('http://missingmaps-api.devseed.com/hashtags/' + hashtag)
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        var nextState = component.state;
        nextState.hashtags[hashtag] = json;
        component.setState(nextState);
      });
    }, 30000);
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
    var rolls = {};
    var numRolls = Object.keys(this.state.hashtags).length;
    if (numRolls === 1) {
      rolls = <Leaderboard1 hashtags={this.state.hashtags} colors={this.state.colors}/>;
    } else if (numRolls === 2) {
      rolls = <Leaderboard2 hashtags={this.state.hashtags} colors={this.state.colors}/>;
    } else if (numRolls === 3) {
      rolls = <Leaderboard3 hashtags={this.state.hashtags} colors={this.state.colors}/>;
    } else {
      rolls = <div>Loading...</div>;
    }
    return (
      <div id = "Main-Container">
        <HashtagStats hashtags={this.state.hashtags} colors={this.state.colors}/>
        {rolls}
      </div>
    );
  }
});
