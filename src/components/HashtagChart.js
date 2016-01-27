import React from 'react';
import R from 'ramda';
import d3 from 'd3';
import {VictoryLine, VictoryChart, VictoryAxis} from 'victory';

export default React.createClass({

  getInitialState: function () {
    return {
      hashtags: {},
      graphData: [{x: new Date(), y: 0},
                  {x: new Date(), y: 1}],
      startDate: new Date(),
      endDate: new Date() + 1
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
  getChartData: function (props) {
    // change to dynamic
    var hardcodedHashtag = 'missingmaps';
    var data = props.hashtags[hardcodedHashtag].times;

    var dates = Object.keys(data).sort(function (a, b) {
      a = new Date(a);
      b = new Date(b);
      return b > a ? -1 : b < a ? 1 : 0;
    });
    var cumulativeEdits = 0;
    var graphData = dates.map(function (date) {
      var dateData = data[date];
      cumulativeEdits += R.sum([dateData.roads, dateData.buildings, dateData.pois, dateData.waterways]);
      return {
        x: new Date(date),
        y: cumulativeEdits
      };
    });

    return {
      graphData: graphData,
      startDate: dates[0],
      endDate: dates[dates.length - 1]
    };
  },

  render: function () {
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
      <VictoryLine
        data={this.state.graphData}/>
    </VictoryChart>;
  }
});
