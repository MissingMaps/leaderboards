import React from 'react';
import R from 'ramda';

export default React.createClass({
  getInitialState: function () {
    return {
      filters: [],
      hashtags: {},
      colors: {}
    };
  },
  componentDidMount: function () {
    this.setState({
      hashtags: this.props.hashtags,
      colors: this.props.colors
    });
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({
      hashtags: nextProps.hashtags,
      colors: nextProps.colors
    });
  },
  handleChange: function (toggles) {
    this.setState({
      filters: toggles
    });
  },
  render: function () {
    var props = this.props;
    var component = this;

    var hashtags = R.pickBy(function (val, key) {
      return !R.contains(key, component.state.filters);
    }, props.hashtags);
    var list = R.map(R.nth(1), R.toPairs(R.map(R.prop('total'), hashtags)));
    var totals = list.reduce(R.mergeWith((a, b) => a + b), {
      buildings: 0,
      waterways: 0,
      pois: 0,
      roads: 0
    });

    return (
      <section className="section-secondary">
        <div className="row">
          <div className="action-header">
            <span className="action-header-text sub-text text-right">Refreshed: Jan 21, 2015  4:00pm</span>
            <a className="refresh-page" href="/">Refresh</a>
          </div>
          <div className="competitor-cards-block">
            <span className="section-headline">Current Leader</span>
            <ul className="competitor-cards">
              <li className="card competitor1 competitor-winner">
                <a className="more-options" href="/">More Options</a>
                <div className="more-options__options">
                  <span>Delete</span>
                </div>  
                <div className="card-main">
                  <h2 className="Card-title">GeorgetownHacks</h2>
                  <span className="card-num feature-num">18,000</span>
                  <span className="text-center sub-descriptor">Total Points</span>
                </div>
                <div className="card-details">
                  <div className="card-buildings">
                    <span className="card-num">9,000</span>
                    <span className="sub-descriptor">Buildings</span>
                  </div>
                  <div>
                    <span className="card-num">9,000</span>
                    <span className="sub-descriptor">km Roads</span>
                  </div>
                  <span className="sub-text text-center">Last Commit: Jan</span>
                </div>
              </li>
              <li className="card competitor2">
                <a className="more-options" href="/">More Options</a>
                <div className="card-main">
                  <h2 className="Card-title">GeorgetownHacks</h2>
                  <span className="card-num feature-num">18,000</span>
                  <span className="text-center sub-descriptor">Total Points</span>
                </div>
                <div className="card-details">
                  <div className="card-buildings">
                    <span className="card-num">9,000</span>
                    <span className="sub-descriptor">Buildings</span>
                  </div>
                  <div>
                    <span className="card-num">9,000</span>
                    <span className="sub-descriptor">km Roads</span>
                  </div>
                  <span className="sub-text text-center">Last Commit: Jan</span>
                </div>
              </li>
              <li className="card competitor3">
                <a className="more-options" href="/">More Options</a>
                <div className="card-main">
                  <h2 className="Card-title">GeorgetownHacks</h2>
                  <span className="card-num feature-num">18,000</span>
                  <span className="text-center sub-descriptor">Total Points</span>
                </div>
                <div className="card-details">
                  <div className="card-buildings">
                    <span className="card-num">9,000</span>
                    <span className="sub-descriptor">Buildings</span> 
                  </div>
                  <div>
                    <span className="card-num">9,000</span>
                    <span className="sub-descriptor">km Roads</span>
                  </div>
                  <span className="sub-text text-center">Last Commit: Jan</span>
                </div>
              </li>
            </ul>
          </div>
          <ul className="tabbed-nav">
            <li className="tab-style active-tab section-headline">Leaderboard</li>
            <li className="tab-style section-headline">Map View</li>
          </ul>
        </div>
      </section>
    );
  }
});
