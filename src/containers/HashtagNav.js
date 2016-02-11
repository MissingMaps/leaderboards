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
      all: []
    };
  },
  componentDidMount: function () {
    var component = this;
    fetch('http://missingmaps-api.devseed.com/hashtags')
    .then(function (res) {
      return res.json();
    })
    .then(function (results) {
      component.setState({
        trending: results
      });
    });
  },
  onChange: function (input, resolve) {
    var arr = this.state.trending.filter(function (word) {
      return word.toLowerCase().startsWith(input.toLowerCase());
    });
    resolve(arr);
  },
  onSubmit: function (input) {
    var params = this.props.id;
    var hashtags = params.split(',');
    if (!R.contains(input, hashtags)) {
      params = params + ',' + input;
      this.props.history.push('/' + params);
    }
  },
  kill: function (input) {
    var params = this.props.id;
    var hashtags = R.without([input], params.split(','));
    this.props.history.push('/' + hashtags.join(','));
  },
  render: function () {
    var component = this;
    return (
      <div>
        <Header />
        <section className="section-feature">
          <div className="row">
            <span className="section-headline section-headline__lighter">Hackathon</span>
            <h1 className="title title-leaderboard">
              {
                this.props.id.split(',').map(function (hashtag) {
                  return <div>
                    {hashtag}
                  </div>;
                })
              }
            </h1>
            <a className="" href="/">Add Competitor</a>
          </div>
        </section>
        <div className='Leaderboard-Navbar-Container'>
          <div className='LN-Hashtag-Container'>
            {
              this.props.id.split(',').map(function (hashtag) {
                return <div className='Current-Hashtag'>
                  <div className='killswitch' onClick={component.kill.bind(component, hashtag)}>x</div>
                  #{hashtag}
                </div>;
              })
            }
            <div className="Input-hashtag">
              <Searchbar onChange={this.onChange} onSubmit={this.onSubmit}/>
            </div>
          </div>
          <div className='LN-View-Navigation'>
            <div className='View-Toggle'>Map View</div>
            <div className='View-Toggle'>Leaderboards</div>
          </div>
        </div>
      </div>
    );
  }
});
