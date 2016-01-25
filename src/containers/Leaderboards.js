import React from 'react';
import R from 'ramda';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import HashtagNav from '../components/HashtagNav.js';
import HashtagStats from '../components/HashtagStats.js';
import Leaderboard1 from '../components/Leaderboard-1.js';
import Leaderboard2 from '../components/Leaderboard-2.js';
import Leaderboard3 from '../components/Leaderboard-3.js';

export default React.createClass({
  getInitialState: function () {
    return {
      changesets: [],
      numRolls: [],
      users: {}
    };
  },
  initSimulation: function (numRolls) {
    var Simulator = require('../../test/simulator/simulator.js');
    var simulation = new Simulator(numRolls);
    var hashtagname = this.props.params.id;
    var component = this;

    if (this.state.interval) {
      clearInterval(this.state.interval);
    }
    var edits = [1250, 750, 125, 426, 222, 100];

    var interval = setInterval(() => {
      var changeset = simulation.randomChangeset();
      var changesets = R.takeLast(1000, R.append(changeset, component.state.changesets));
      var users = component.state.users;
      var user = changeset.metadata.user;
      if (!users[user]) {
        users[user] = changeset.elements.length;
      } else {
        users[user] += changeset.elements.length;
      }

      this.setState({
        name: hashtagname,
        changesets: changesets,
        users: users,
        numRolls: numRolls,
        stats: edits
      });
    }, 1000); // Every second

    this.setState({
      interval: interval
    });
  },
  componentDidMount: function () {
    if (process.env.NODE_ENV === 'development') {
      var numRolls = R.split(',', this.props.params.id).length;
      this.initSimulation(numRolls);
    }
  },
  componentWillReceiveProps: function (nextProps) {
    var numRolls = R.split(',', nextProps.params.id).length;
    this.initSimulation(numRolls);
  },

  render: function () {
    var rolls = {};
    var state = this.state;
    if (state.numRolls === 1) {
      rolls = <Leaderboard1 users={state.users} />;
    } else if (state.numRolls === 2) {
      rolls = <Leaderboard2 users={state.users} />;
    } else {
      rolls = <Leaderboard3 users={state.users} />;
    }
    return (
      <div>
        <Header />
        <div>
          <div id = "Page-Container">
            <div id = "Main-Container">
              <HashtagNav />
              <HashtagStats data={this.state}/>
              {rolls}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
});
