import React from 'react';
import R from 'ramda';

var Userlist = React.createClass ({
  render: function() {
    if (typeof this.props.users === 'undefined') {
      return <div></div>
    }
    var component = this;
    var list = Object.keys(this.props.users)
    .map(function (key) {
      return (<li key={key}>{key}: {component.props.users[key]}</li>)
    })
    return (
      <ul>
      {list}
      </ul>
      )
  }
});

export default React.createClass({
  getInitialState: function () {
    return {
      changesets: [],
      users: {}
    };
  },

 //Simulator
 componentDidMount: function() {
  console.log('component did mount')
  if (process.env.NODE_ENV === 'development') {
    var Simulator = require('../../test/simulator/simulator.js');
    var simulation = new Simulator(R.split(',', this.props.params.id));
    var component = this;

    setInterval(() => {
      var changeset = simulation.randomChangeset();
      var changesets = R.takeLast(1000, R.append(changeset, component.state.changesets));
      var users = component.state.users;
      var user = changeset.metadata.user;
      if (!users[user]) {
        users[user] = changeset.elements.length;
      } else {
        users[user] += changeset.elements.length
      }

      this.setState({
        changesets: changesets,
        users: users
      });
      }, 1000); // Every second
  }
},
render: function () {
  console.log(this.state)
  return <Userlist users={this.state.users} />
}
});
