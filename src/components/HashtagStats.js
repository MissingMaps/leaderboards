import React from 'react';
import R from 'ramda';
import Toggle from '../components/ToggleSwitch.js';
import Chart from '../components/HashtagChart.js';

export default React.createClass({
  getInitialState: function () {
    return {
      filters: [],
      hashtags: {},
      colors: {}
    };
  },
  assignColors: function (props) {
    var colorClasses = ['hashtag1', 'hashtag2', 'hashtag3'];
    var colors = R.zipObj(Object.keys(props.hashtags), colorClasses);
    this.setState({
      colors: colors
    });
  },
  componentDidMount: function () {
    this.setState({
      hashtags: this.props.hashtags
    });
    this.assignColors(this.props);
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({
      hashtags: nextProps.hashtags
    });
    this.assignColors(nextProps);
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
      <div className='Leaderboard-Stats-Container'>
          <div className='Hashtag-Timeline-Container'>
            <Chart hashtags={hashtags} colors={this.state.colors}/>
          </div>
          <div className='Stats-Content'>
            <div className = 'Stats-Togglebox'>
              <Toggle onChange={this.handleChange} hashtags={this.state.colors}/>
            </div>
            <div className = 'Stats-Statbox'>
              <table className = "table-curve">
                <tbody>
                  <tr>
                    <th>Total Edits</th>
                    <th>{R.sum(R.map(R.nth(1), R.toPairs(totals)))}</th>
                  </tr>
                  <tr>
                    <td>Roads</td>
                    <td>{totals.roads}</td>
                  </tr>
                  <tr>
                    <td>Roads</td>
                    <td>{totals.buildings}</td>
                  </tr>
                  <tr>
                    <td>Waterways</td>
                    <td>{totals.waterways}</td>
                  </tr>
                  <tr>
                    <td>Point of Interests</td>
                    <td>{totals.pois}</td>
                  </tr>
                </tbody>
              </table>
            </div>
              <div className = "whitespace"></div>
              <div className = "center-text"><strong>Trending Hashtags</strong></div>
                <table className = "User-roll-table">
                <tbody>
                  <tr>
                    <td>#MissingMaps</td>
                  </tr>
                  <tr>
                    <td>#SecondHashtag</td>
                  </tr>
                  <tr>
                    <td>#ThirdHashtag</td>
                  </tr>
                  <tr>
                    <td>#FourthHashtag</td>
                  </tr>
                </tbody>
              </table>
              </div>
        </div>
    );
  }
});
