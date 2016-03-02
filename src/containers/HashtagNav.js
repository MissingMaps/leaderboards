import React from 'react';
import R from 'ramda';
import Searchbar from 'react-search-bar';
import fetch from 'isomorphic-fetch';
import Header from '../components/Header.js';

export default React.createClass({
  getInitialState: function () {
    return {
      trending: [
      ],
      all: [],
      showModal: false
    };
  },
  componentDidMount: function () {
    var component = this;
    fetch('http://osmstats.redcross.org/hashtags')
    .then(function (res) {
      return res.json();
    })
    .then(function (results) {
      var resultsCheck = results.trending.length;

      if (resultsCheck == 0) {
        var defaultText = 'No current trending hashtags.';
      } else {
        var defaultText = '';
      }

      component.setState({
        all: results.hashtags,
        trending: results.trending,
        default: defaultText
      });
    });
  },
  onChange: function (input, resolve) {
    var arr = this.state.all.filter(function (word) {
      return word.toLowerCase().startsWith(input.toLowerCase());
    });
    resolve(arr);
  },
  onSubmit: function (input) {
    var params = this.props.id;
    var hashtags = params.split(',');
    if (!R.contains(input, hashtags)) {
      params = params + ',' + input;
      var mapLocation = R.match(/\/.+\/map/, this.props.location.pathname).length;
      if (mapLocation > 0) {
        this.props.history.push('/' + params + '/map');
      } else {
        this.props.history.push('/' + params);
      }
    }
    this.setState({
      showModal: false
    });
  },
  render: function () {
    var list = this.props.id.split(',');
    var component = this;
    return (
      <div>
        <Header />
        <section className="section-feature">
          <div className="row">
            <span className="section-headline section-headline__lighter">Leaderboard</span>
            <h1 className="title title-leaderboard">
              {
                list.map(function (hashtag, index) {
                  return <span className="header-spacer-multiple" key={hashtag}>
                    {hashtag} {(list.length > 1 && index < list.length - 1) ? <span>vs.</span> : <div style={{'display': 'none'}}></div>}
                  </span>;
                })
              }
            </h1>
            <div className='Leaderboard-Navbar-Container' style={{'display': ((list.length < 3) ? '' : 'none')}}>
              <a className="link-actionlink" onClick={
                (e) => {
                  e.preventDefault();
                  this.setState({
                    showModal: !this.state.showModal
                  });
                }
              }>Add Competitor</a>
            <div className='LN-Hashtag-Container' style={{
              'display': (this.state.showModal ? '' : 'none')
            }}>
                <div className="Input-hashtag">
                  <Searchbar onChange={this.onChange} onSubmit={this.onSubmit} value="submit"/>
                </div>
                <div className="dropdown-details">
                  <h5 className="header-style__plain">Popular Options</h5>
                  <ul>
                    <li className = "dropdown-option">
                      { this.state.default }
                    </li>
                  </ul>
                  <ul>
                    {
                      this.state.trending.map(function (hashtag) {
                        return <li className="dropdown-option" key={hashtag}>
                        <a href="#" onClick={
                          (e) => {
                            e.preventDefault();
                            component.onSubmit(hashtag);
                          }
                        }>{hashtag}</a></li>;
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
     </div>
    );
  }
});
