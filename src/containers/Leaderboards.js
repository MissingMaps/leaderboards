import React from 'react';
import R from 'ramda';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import HashtagNav from '../components/HashtagNav.js';
import HashtagStats from '../components/HashtagStats.js';
import LeaderboardContainer from '../containers/Leaderboard-Container.js';

// Create Userlist
var Userlist = React.createClass({
  render: function () {
    if (typeof this.props.users === 'undefined') {
      return <div></div>;
    }
    var component = this;
    var list = Object.keys(this.props.users)
    .map(function (key) {
      return (<li key={key}>{key}: {component.props.users[key]}</li>);
    });
    return (
      <ul>
      {list}
      </ul>
      );
  }
});

export default React.createClass({
  getInitialState: function () {
    return {
      changesets: [],
      users: {}
    };
  },

  componentDidMount: function () {
    console.log('component did mount');
    if (process.env.NODE_ENV === 'development') {
      var Simulator = require('../../test/simulator/simulator.js');
      var simulation = new Simulator(R.split(',', this.props.params.id));
      var numRolls = R.split(',', this.props.params.id).length;
      var component = this;

      setInterval(() => {
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
          changesets: changesets,
          users: users,
          numRolls: numRolls
        });
      }, 1000); // Every second
    }
  },
  render: function () {
    return (
      <div>
        <Header />
        <div>
            <div id = "Page-Container">
              <div id = "Main-Container">
                <HashtagNav />
                <HashtagStats />
                <LeaderboardContainer />
                <Userlist users={this.state.users} />
              </div>
            </div>
          <Footer />
        </div>
      </div>
    );
  }
});
