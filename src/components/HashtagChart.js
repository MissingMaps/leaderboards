import React from 'react';
import R from 'ramda';
import d3 from 'd3';
import {VictoryLine, VictoryChart, VictoryAxis} from 'victory';

export default React.createClass({

  getInitialState: function () {
    var hashtags = this.props.hashtags || {};
    return {
      hashtags: hashtags,
      data: []
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

    data = Object.keys(data).map(function (date) {
      var dateData = data[date];
      return {
        x: new Date(date),
        y: R.sum([dateData.roads, dateData.buildings, dateData.pois, dateData.waterways])};
    });
    this.setState({data: data});
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
          new Date(2016, 1, 1),
          new Date(2016, 4, 31)
        ]}
        tickFormat={d3.time.format('%B')}/>
      <VictoryLine
        data={this.state.data}/>
    </VictoryChart>;
  }
});
