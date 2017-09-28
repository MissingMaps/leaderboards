import classNames from 'classnames';
import createClass from 'create-react-class';
import moment from 'moment';
import React from 'react';

export default createClass({
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

    var Buildings = addCommas(this.props.totals.buildings);
    var Roads = addCommas(Math.round(this.props.totals.roads));
    var Totals = addCommas(this.props.totals.edits);

    function addCommas (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return (
      <div className={className}>
          <div className="more-options-container">
            <a className="more-options" onClick={component.handleClick}> More Options</a>
            <div className="more-options-module" onClick={component.deleteHashtag} style={
              { 'display': (component.state.modalToggle ? '' : 'none'),
                'cursor': 'pointer'
              }}>
              <span >Remove</span>
            </div>
          </div>
          <div className="card-main">
            <h2 className="Card-title">{this.props.hashtag}</h2>
            <span className="card-num feature-num">{Totals}</span>
            <span className="text-center sub-descriptor">Total Edits</span>
          </div>
          <div className="card-details">
            <div className="card-buildings text-center">
              <span className="card-num">{Buildings} </span>
              <p><span className="sub-descriptor">Buildings</span></p>
            </div>
            <div>
              <span className="card-num">{Roads} </span>
              <p><span className="sub-descriptor">km Roads</span></p>
            </div>
            <span className="sub-text text-center">Last Edit: {moment(this.props.totals.last_update).fromNow()}</span>
          </div>
        </div>
    );
  }
});
