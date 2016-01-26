import React from 'react';
import R from 'ramda';
import Chance from 'chance';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import HashtagNav from '../components/HashtagNav.js';
import HashtagStats from '../components/HashtagStats.js';
import Leaderboard1 from '../components/Leaderboard-1.js';
import Leaderboard2 from '../components/Leaderboard-2.js';
import Leaderboard3 from '../components/Leaderboard-3.js';
import fetch from 'isomorphic-fetch';

var chance = new Chance();

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

    // Create new intervals
    var hashtags = R.split(',', props.params.id);
    R.map(this.createInterval, hashtags);
  },
  createInterval: function (hashtag) {
    var component = this;
    fetch('http://missingmaps-api.devseed.com/hashtags/' + hashtag)
    .then(function (res) {
      return res.json();
    })
    .then(function (json) {
      var nextState = component.state;
      nextState.hashtags[hashtag] = json;
      return nextState;
    })
    .then(function (nextState) {
      var interval = setInterval(() => {
        var hashtags = nextState.hashtags;
        Object.keys(hashtags).map(function (hashtag) {
          var userIds = Object.keys(hashtags[hashtag].users);
          if (userIds.length) {
            var users = R.times(() => chance.pick(userIds), 5);
            users.forEach(function (user) {
              hashtags[hashtag].users[user].total += 10;
            });
          }
        });
        component.setState(nextState);
      }, 3000);
      component.state.intervals.push(interval);
    });
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
      rolls = <Leaderboard1 hashtags={this.state.hashtags} />;
    } else if (numRolls === 2) {
      rolls = <Leaderboard2 hashtags={this.state.hashtags} />;
    } else if (numRolls === 3) {
      rolls = <Leaderboard3 hashtags={this.state.hashtags} />;
    } else {
      rolls = <div>Loading...</div>;
    }
    return (
      <div>
        <Header />
        <div>
          <div id = "Page-Container">
            <div id = "Main-Container">
              <HashtagNav />
              <HashtagStats data={this.state}/>
              {rolls}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
});
