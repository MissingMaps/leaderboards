import React from 'react';
import Userlist from './Userlist.js';

export default function (props) {
  var hashtagNames = Object.keys(props.hashtags);
  var hashtags = props.hashtags;
  var first = hashtagNames[0];
  var colors = props.colors;
  var colorLookup = {
    hashtag1: '#9dcf80',
    hashtag2: '#1e9fcc',
    hashtag3: '#ea6957'
  };
  var color = colorLookup[colors[first]];
  return (
    <div className = "Leaderboard-Container">
      <div className = "Leaderboard-2">
        <div className = "Hashtag-Container">
          <div className = "Card">
            <div className = "Hashtag-Title " style={{color: color}}>#{first}</div>
            <Userlist users={hashtags[first].users}/>
          </div>
        </div>
      </div>
    </div>
  );
}
