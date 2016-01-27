import React from 'react';
import R from 'ramda';
import d3 from 'd3';
import {VictoryLine, VictoryChart, VictoryAxis} from 'victory';

export default React.createClass({

  getInitialState: function () {
    return {
      hashtags: {},
      graphData: [],
      startDate: new Date(),
      endDate: new Date()
    };
  },
  componentWillReceiveProps: function (nextProps) {
    if (Object.keys(nextProps.hashtags).length) {
      var data = this.getChartData(nextProps);
      this.setState({
        graphData: data.graphData,
        startDate: data.startDate,
        endDate: data.endDate
      });
    }
  },
  sortDates: function (dates) {
    return dates.sort(function (a, b) {
      a = new Date(a);
      b = new Date(b);
      return b > a ? -1 : b < a ? 1 : 0;
    });
  },
  getChartData: function (props) {
    var graphData = {};
    var startEndDates = [];

    Object.keys(props.hashtags).forEach(function (hashtag) {
      var data = props.hashtags[hashtag].times;

      // Sort dates
      var dates = this.sortDates(Object.keys(data));

      // Keep track of minimum and maximum dates
      startEndDates.push(dates[0]);
      startEndDates.push(dates[dates.length - 1]);

      // Create the graph data object
      var cumulativeEdits = 0;
      var lineData = dates.map(function (date) {
        var dateData = data[date];
        cumulativeEdits += R.sum([dateData.roads, dateData.buildings, dateData.pois, dateData.waterways]);
        return {
          x: new Date(date),
          y: cumulativeEdits
        };
      });
      graphData[hashtag] = lineData;
    }, this);

    startEndDates = this.sortDates(startEndDates);
    return {
      graphData: graphData,
      startDate: startEndDates[0],
      endDate: startEndDates[startEndDates.length - 1]
    };
  },

  render: function () {
    var lines = Object.keys(this.props.hashtags).map(function (hashtag) {
      return <VictoryLine data={this.state.graphData[hashtag]} />;
    }, this);
    return <VictoryChart
      height={300}
      width={300}
      scale={{
        x: d3.time.scale(),
        y: d3.scale.linear()
      }}>
      <VictoryAxis
        label="Cumulative Edits"
        tickValues={[
          new Date(this.state.startDate),
          new Date(this.state.endDate)
        ]}
        tickFormat={d3.time.format('%B')}/>
      {lines}
    </VictoryChart>;
  }
});
