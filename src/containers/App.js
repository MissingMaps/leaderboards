import React from 'react';
import HashtagNav from '../containers/HashtagNav.js';
import HashtagStats from '../components/HashtagStats.js';
import R from 'ramda';
import Promise from 'bluebird';

export default React.createClass({
  getInitialState: function () {
    return {
      hashtags: {},
      intervals: [],
      lastRefresh: '',
      features: {}
    };
  },
  createIntervalsFromProps: function (props) {
    // Clear existing intervals
    R.map(clearInterval, this.state.intervals);
    this.state.hashtags = {};
    this.state.features = {};

    var colorClasses = ['redteam', 'blueteam', 'greenteam'];

    // Create new intervals
    var hashtags = R.split(',', props.params.id);

    var component = this;
    var fetchAll = function () {
      return Promise.map(hashtags, function (hashtag) {
        return component.fetchData(hashtag);
      }).then(function (results) {
        var nextState = {
          hashtags: {},
          features: {}
        };
        results.forEach(function (result) {
          nextState.hashtags = R.merge(nextState.hashtags, result.hashtags);
          nextState.features = R.merge(nextState.features, result.features);
        });
        return nextState;
      }).then(function (nextState) {
        component.setState(nextState);
      });
    };
    var interval = setInterval(fetchAll, 30000);
    fetchAll();
    this.state.intervals.push(interval);

    // Not efficient use of setState
    var colors = R.zipObj(hashtags, colorClasses);
    this.setState({
      colors: colors
    });
  },
  fetchData: function (hashtag) {
    return fetch('http://missingmaps-api.devseed.com/hashtags/' + hashtag + '/users')
    .then(function (res) {
      return res.json();
    })
    .then(function (hashtagResult) {
      return fetch('http://ec2-52-87-229-14.compute-1.amazonaws.com/' + hashtag + '/map')
      .then(function (res) {
        return res.json();
      })
      .then(function (mapResult) {
        var nextState = {
          hashtags: {},
          features: {}
        };
        nextState.hashtags[hashtag] = hashtagResult;
        nextState.features[hashtag] = mapResult;
        return nextState;
      });
    });
  },
  componentDidMount: function () {
    if (process.env.NODE_ENV === 'development') {
      this.createIntervalsFromProps(this.props);
    }
  },
  componentWillReceiveProps: function (nextProps) {
    console.log('nextProps', nextProps);
    if (process.env.NODE_ENV === 'development') {
      this.createIntervalsFromProps(nextProps);
    }
  },
  render: function () {
    return (
      <div>
        <div>
          <div id = "Page-Container">
            <HashtagNav id={this.props.params.id} history={this.props.history}/>
            <HashtagStats colors={this.state.colors} rows={this.state.hashtags} refresh={this.state.lastRefresh}/>
            {this.props.children && React.cloneElement(this.props.children, {
              colors: this.state.colors,
              rows: this.state.hashtags,
              features: this.state.features
            })}
          </div>
        </div>
      </div>
    );
  }
});
