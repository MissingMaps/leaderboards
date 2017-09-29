import createClass from "create-react-class";
import R from "ramda";
import React from "react";
import { Router, Route, Switch } from "react-router";

import HashtagNav from "../containers/HashtagNav";
import HashtagStats from "../components/HashtagStats";
import Leaderboard from "../components/Leaderboard";
import LeaderboardMap from "../components/Leaderboard-map";

import "../assets/styles/table.css";
import "../assets/styles/table-osm.css";
import "../assets/styles/main.css";

const STATS_API_URL =
  process.env.REACT_APP_STATS_API_URL || "https://osmstats.redcross.org";

const get = async uri => {
  const rsp = await fetch(uri);

  if (rsp.status !== 200) {
    throw new Error(rsp.json());
  }

  return rsp.json();
};

const getFeatures = async hashtag =>
  get(`${STATS_API_URL}/hashtags/${hashtag}/map`);

const getSummary = async hashtag =>
  get(`${STATS_API_URL}/group-summaries/${hashtag}`);

const getUsers = async hashtag =>
  get(`${STATS_API_URL}/hashtags/${hashtag}/users`);

export default createClass({
  getInitialState: function() {
    return {
      colors: {},
      hashtags: {},
      intervals: {},
      lastRefresh: ""
    };
  },
  initializeIntervals: function(props) {
    const { match: { params: { id } } } = this.props;

    var hashtags = R.split(",", id);
    var colorClasses = ["redteam", "blueteam", "greenteam"];

    var intervals = {};
    var colors = {};
    var component = this;
    hashtags.forEach(function(hashtag, index) {
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
  fetchData: async function(hashtag) {
    try {
      const [users, features, summaries] = await Promise.all([
        getUsers(hashtag),
        getFeatures(hashtag),
        getSummary(hashtag)
      ]);

      const summary = summaries[hashtag];

      this.setState({
        hashtags: {
          ...this.state.hashtags,
          [hashtag]: {
            summary: {
              ...summary,
              edits:
                summary.building_count_add +
                summary.building_count_mod +
                summary.road_count_add +
                summary.road_count_mod +
                summary.waterway_count_add +
                summary.poi_count_add,
              buildings:
                summary.building_count_add + summary.building_count_mod,
              road_km: summary.road_km_add + summary.road_km_mod,
              last_updated: summary.last_updated
            },
            users,
            features
          }
        }
      });
    } catch (err) {
      console.warn("Failed while fetching data:", err);
    }
  },
  componentDidMount: function() {
    this.initializeIntervals(this.props);
  },
  componentWillReceiveProps: function(nextProps) {
    const { match: { params: { id } } } = nextProps;

    var newHashtags = R.split(",", id);
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
  handleHashtagDelete: function(hashtags) {
    var component = this;
    hashtags.forEach(function(hashtag) {
      var state = component.state;
      delete state.hashtags[hashtag];
      delete state.colors[hashtag];
      clearInterval(state.intervals[hashtag]);
      component.setState(state);
    });
  },
  handleHashtagAdd: function(hashtags) {
    var component = this;
    var colorClasses = ["redteam", "blueteam", "greenteam"];
    hashtags.forEach(function(hashtag) {
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
  render: function() {
    var users = {};
    var features = {};
    var summaries = {};
    var hashtags = this.state.hashtags;
    Object.keys(hashtags).forEach(hashtag => {
      users[hashtag] = hashtags[hashtag].users;
      features[hashtag] = hashtags[hashtag].features;
      summaries[hashtag] = hashtags[hashtag].summary;
    });

    const { history, match: { params: { id } } } = this.props;

    return (
      <div>
        <div>
          <div id="Page-Container">
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
              summaries={summaries}
            />

            <Router history={history}>
              <Switch>
                <Route
                  path="/:id/map"
                  render={props => (
                    <LeaderboardMap
                      colors={this.state.colors}
                      rows={users}
                      features={features}
                      {...props}
                    />
                  )}
                />
                <Route
                  render={props => (
                    <Leaderboard
                      colors={this.state.colors}
                      rows={users}
                      features={features}
                      {...props}
                    />
                  )}
                />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
});
