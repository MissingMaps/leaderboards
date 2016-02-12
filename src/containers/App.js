import React from 'react';
import HashtagNav from '../containers/HashtagNav.js';
import HashtagStats from '../components/HashtagStats.js';
import R from 'ramda';

export default React.createClass({
  getInitialState: function () {
    return {
      hashtags: {},
      intervals: [],
      lastRefresh: ''
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
        nextState.lastRefresh = new Date();
        component.setState(nextState);
      });

      fetch('http://192.168.99.100/hashtags/' + hashtag + '/maps')
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        var nextState = component.state;
        nextState.features[hashtag] = json;
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
