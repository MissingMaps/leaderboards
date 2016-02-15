import React from 'react';
import classNames from 'classnames';
import moment from 'moment';

export default React.createClass({
  getInitialState: function () {
    return {
      modalToggle: false
    };
  },
  handleClick: function (e) {
    e.preventDefault();
    console.log(this.state);
    this.setState({
      modalToggle: !this.state.modalToggle
    });
  },
  deleteHashtag: function (e) {
    this.props.deleteHashtag(this.props.hashtag);
  },
  render: function () {
    var component = this;
    var className = classNames('card', this.props.color, {'isWinner': this.props.isWinner});
    return (
      <div className={className}>
          <div className="more-options-container">
            <a className="more-options" onClick={component.handleClick}> More Options</a>
            <div className="more-options-module" onClick={component.deleteHashtag} style={
              { 'display': (component.state.modalToggle ? '' : 'none'),
                'cursor': 'pointer'
              }}>
              <span >Delete</span>
            </div>
          </div>
          <div className="card-main">
            <h2 className="Card-title">{this.props.hashtag}</h2>
            <span className="card-num feature-num">{this.props.totals.edits}</span>
            <span className="text-center sub-descriptor">Total Points</span>
          </div>
          <div className="card-details">
            <div className="card-buildings">
              <span className="card-num">{this.props.totals.buildings} </span>
              <span className="sub-descriptor">Buildings</span>
            </div>
            <div>
              <span className="card-num">{this.props.totals.roads} </span>
              <span className="sub-descriptor">km Roads</span>
            </div>
            <span className="sub-text text-center">Last Commit: {moment(this.props.totals.last_update).fromNow()}</span>
          </div>
        </div>
    );
  }
});