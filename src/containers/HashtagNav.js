import React from 'react';
import R from 'ramda';
import Searchbar from 'react-search-bar';

export default React.createClass({
  getInitialState: function () {
    return {
      trending: [
        'osmgeoweek',
        'missingmaps',
        'Mali',
        'Zambia'
      ],
      all: []
    };
  },
  onChange: function (input, resolve) {
    var arr = this.state.trending.filter(function (word) {
      return word.startsWith(input);
    });
    resolve(arr);
  },
  onSubmit: function (input) {
    var params = this.props.id;
    var hashtags = params.split(',');
    console.log(input);
    console.log(hashtags);
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
          <div className='View-Toggle'>Leaderboards</div>
          <div className='View-Toggle'>Map Wow!</div>
        </div>
      </div>
    );
  }
});
