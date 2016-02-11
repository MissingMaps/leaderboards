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
    this.setState({
      showModal: false
    });
  },
  kill: function (input) {
    var params = this.props.id;
    var hashtags = R.without([input], params.split(','));
    this.props.history.push('/' + hashtags.join(','));
  },
  render: function () {
    var list = this.props.id.split(',');
    return (
      <div>
        <Header />
        <section className="section-feature">
          <div className="row">
            <span className="section-headline section-headline__lighter">Hackathon</span>
            <h1 className="title title-leaderboard">
              {
                list.map(function (hashtag, index) {
                  return <span className="header-spacer-multiple" key={hashtag}>
                    {hashtag} {(list.length > 1 && index < list.length - 1) ? <span>vs.</span> : <div style={{'display': 'none'}}></div>}
                  </span>;
                })
              }
            </h1>
            <div className='Leaderboard-Navbar-Container'>
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
                  <Searchbar onChange={this.onChange} onSubmit={this.onSubmit}/>
                </div>
                <div className="dropdown-details">
                  <h5 className="header-style__plain">Popular Options</h5>
                  <ul>
                    <li className="dropdown-option"><a href="#">Option 1</a></li>
                    <li className="dropdown-option"><a href="#">Option 1</a></li>
                    <li className="dropdown-option"><a href="#">Option 1</a></li>
                    <li className="dropdown-option"><a href="#">Option 1</a></li>
                    <li className="dropdown-option"><a href="#">Option 1</a></li>
                  </ul>
                </div>
              </div>
         {/*   <div className='LN-View-Navigation'>
                <div className='View-Toggle'>Map View</div>
                <div className='View-Toggle'>Leaderboards</div>
              </div>*/}
            </div>
          </div>
        </section>
      </div>
    );
  }
});
