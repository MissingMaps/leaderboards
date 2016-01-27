import React from 'react';
import R from 'ramda';
import d3 from 'd3';
import {VictoryLine, VictoryChart, VictoryAxis} from 'victory';

export default React.createClass({

  getInitialState: function () {
    var hashtags = this.props.hashtags || {};
    return {
      hashtags: hashtags,
      data: [],
      startDate: new Date(),
      endDate: new Date()
    };
  },
  componentDidMount: function () {
    this.setState({hashtags: this.props.hashtags});
  },
  componentWillReceiveProps: function (nextProps) {
    this.setState({hashtags: nextProps.hashtags});
    if (Object.keys(this.state.hashtags).length > 0) {
      this.plotData();
    }
  },
  plotData: function () {
    // change to dynamic
    var hardcodedHashtag = 'missingmaps';
    var data = this.state.hashtags[hardcodedHashtag].times;

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

    this.setState({
      data: graphData,
      startDate: dates[0],
      endDate: dates[dates.length - 1]
    });
  },

  render: function () {
    // console.log('hashtagData', this.state.hashtags);
    // console.log('colors', this.props.colors);

    return <VictoryChart
      height={300}
      width={300}
      scale={{
        x: d3.time.scale(),
        y: d3.scale.linear()
      }}>
      <VictoryAxis
        label="Submitted Changes"
        tickValues={[
          new Date(this.state.startDate),
          new Date(this.state.endDate)
        ]}
        tickFormat={d3.time.format('%B')}/>
      <VictoryLine
        data={this.state.data}/>
    </VictoryChart>;
  }
});
