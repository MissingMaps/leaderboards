import React from 'react';
import R from 'ramda';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import HashtagNav from '../components/HashtagNav.js';
import HashtagStats from '../components/HashtagStats.js';
import LeaderboardContainer from '../containers/Leaderboard-Container.js';


// Create Userlist

export default React.createClass({
  getInitialState: function () {
    return {
      changesets: [],
      numRolls: [],
      users: {}
    };
  },

  componentDidMount: function () {
    console.log('component did mount');
    if (process.env.NODE_ENV === 'development') {
      var Simulator = require('../../test/simulator/simulator.js');
      var simulation = new Simulator(R.split(',', this.props.params.id));
      var hashtagname = this.props.params.id;
      var numRolls = R.split(',', this.props.params.id).length;
      var component = this;

      var edits = [1250, 750, 125, 426, 222, 100];

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
          name: hashtagname,
          changesets: changesets,
          users: users,
          numRolls: numRolls,
          stats: edits
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
                <HashtagStats data={this.state}/>
                <LeaderboardContainer data={this.state}/>
              </div>
            </div>
          <Footer />
        </div>
      </div>
    );
  }
});
