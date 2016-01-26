import React from 'react';
import {VictoryLine} from 'victory';

export default React.createClass({

  render: function () {
    console.log('hashtagData', this.props.hashtags);
    console.log('colors', this.props.colors);
    return <VictoryLine />;
  }
});
