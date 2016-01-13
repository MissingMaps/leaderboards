import React from 'react';
import R from 'ramda';

export default React.createClass({
  getInitialState: function () {
    return {
      changesets: []
    };
  },
  componentDidMount: function () {
    if (process.env.NODE_ENV === 'development') {
      var Simulator = require('../../test/simulator/simulator.js');
      var simulation = new Simulator(R.split(',', this.props.params.id));
      var component = this;

      setInterval(() => {
        var changeset = simulation.randomChangeset();
        var changesets = R.takeLast(1000, R.append(changeset, component.state.changesets));

        this.setState({
          changesets: changesets
        });
      }, 1000); // Every second
    }
  },
  render: function () {
    return <div>{JSON.stringify(R.last(this.state.changesets))}</div>;
  }
});
