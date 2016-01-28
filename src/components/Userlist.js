import React from 'react';
import MagicMove from 'react-magic-move';
import R from 'ramda';

module.exports = React.createClass({
  getInitialState: function () {
    return {
      users: [],
      sorted: []
    };
  },
  sortUsers: function (users) {
    var pairs = R.toPairs(R.map(R.prop('total'), users));
    var sorted = R.reverse(R.sortBy(R.nth(1), pairs));
    this.setState({
      sorted: sorted
    });
  },
  componentDidMount: function () {
    this.sortUsers(this.props.users);
    this.setState({
      users: this.props.users
    });
  },
  componentWillReceiveProps: function (nextProps) {
    this.sortUsers(nextProps.users);
    this.setState({
      users: nextProps.users
    });
  },
  render: function () {
    if (typeof this.state.users === 'undefined') {
      return <div></div>;
    }
    var component = this;
    if (this.state.sorted.length) {
      var list = this.state.sorted
      .map(function (key, index) {
        return (
          <div className='User-roll-row' key={key[0]}>
            <div>{index + 1}.</div>
            <div>{component.state.users[key[0]].name}</div>
            <div>{key[1]}</div>
          </div>
        );
      });
      return (
        <div className = "User-roll">
          <div className = "User-roll-table">
            <MagicMove>
              {list}
            </MagicMove>
          </div>
        </div>
      );
    } else {
      return <div className='roll-error'><p>This project doesn't exist!</p></div>;
    }
  }
});
