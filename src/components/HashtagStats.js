import React from 'react';
import R from 'ramda';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';

export default React.createClass({
  getInitialState: function () {
    return {
      hashtags: {},
      url: ''
    };
  },
  createTotals: function (props) {
    var rows = props.rows;
    var colors = props.colors;
    var hashtags = {};

    Object.keys(rows).forEach(function (hashtag) {
      var totals = R.reduce(R.mergeWithKey(function (key, l, r) {
        if (key === 'edits' || key === 'buildings' || key === 'roads') {
          return l + r;
        } else if (key === 'created_at') {
          return ((moment(l).unix() > moment(r).unix()) ? l : r);
        } else {
          return l;
        }
      }), {}, rows[hashtag]);

      hashtags[hashtag] = {
        color: colors[hashtag],
        roads: Number(totals.roads.toFixed(2)),
        buildings: totals.buildings,
        edits: totals.edits,
        last_update: totals.created_at
      };
    });

    this.setState({
      hashtags: hashtags,
      url: Object.keys(rows).join(',')
    });
  },
  componentDidMount: function () {
    var props = this.props;
    if (props && props.hasOwnProperty('colors') && props.hasOwnProperty('rows')) this.createTotals(props);
    if (props && props.hasOwnProperty('lastRefresh')) {
      this.setState({
        lastRefresh: props.lastRefresh
      });
    }
  },
  componentWillReceiveProps: function (props) {
    if (props && props.hasOwnProperty('colors') && props.hasOwnProperty('rows')) this.createTotals(props);
    if (props && props.hasOwnProperty('lastRefresh')) {
      this.setState({
        lastRefresh: props.lastRefresh
      });
    }
  },
  render: function () {
    var component = this;
    var cards = R.sortBy(function (key) {
      return component.state.hashtags[key].edits;
    }, Object.keys(component.state.hashtags))
    .reverse()
    .map(function (key, index) {
      var totals = component.state.hashtags[key];
      var className = 'card';
      switch (totals.color) {
        case 'blueteam':
          className += ' competitor1';
          break;
        case 'redteam':
          className += ' competitor2';
          break;
        case 'greenteam':
          className += ' competitor3';
          break;
        default:
          className += ' competitor1';
      }
      if (index === 0) {
        className += ' competitor-winner';
      }
      return (
        <li className={className} key={key}>
          <a className="more-options" href="/">More Options</a>
          <div className="card-main">
            <h2 className="Card-title">{key}</h2>
            <span className="card-num feature-num">{totals.edits}</span>
            <span className="text-center sub-descriptor">Total Points</span>
          </div>
          <div className="card-details">
            <div className="card-buildings">
              <span className="card-num">{totals.buildings} </span>
              <span className="sub-descriptor">Buildings</span>
            </div>
            <div>
              <span className="card-num">{totals.roads} </span>
              <span className="sub-descriptor">km Roads</span>
            </div>
            <span className="sub-text text-center">Last Commit: {moment(totals.last_update).fromNow()}</span>
          </div>
        </li>
      );
    });

    return (
      <section className="section-secondary">
        <div className="row">
          <div className="action-header">
            <span className="action-header-text sub-text text-right">Refreshed: {moment(component.state.lastRefresh).calendar()}</span>
            <a className="refresh-page" href="/">Refresh</a>
          </div>
          <div className="competitor-cards-block">
            <span className="section-headline">Current Leader</span>
            <ul className="competitor-cards">
              {cards}
            </ul>
          </div>
          <ul className="tabbed-nav">
              <IndexLink to={`/${this.state.url}`} className="tab-style section-headline" activeClassName="active-tab" >Leaderboard</IndexLink>
              <Link to={`/${this.state.url}/map`} className="tab-style section-headline" activeClassName="active-tab">Map View</Link>
          </ul>
        </div>
      </section>
    );
  }
});
