import React from 'react';
import Userlist from './Userlist.js';

export default function (props) {
  var hashtags = props.hashtags;
  var hashtagNames = Object.keys(hashtags);
  var first = hashtagNames[0];
  var second = hashtagNames[1];
  var colors = props.colors;
  var colorLookup = {
    hashtag1: '#9dcf80',
    hashtag2: '#1e9fcc',
    hashtag3: '#ea6957'
  };
  var color1 = colorLookup[colors[first]];
  var color2 = colorLookup[colors[second]];
  return (
    <div className = "Leaderboard-Container">
      <div className = "Leaderboard-2">
        <div className = "Hashtag-Container">
          <div className = "Card">
            <div className = "Hashtag-Title" style={{color: color1}}>#{first}</div>
            <Userlist users={hashtags[first].users} />
          </div>
        </div>
      </div>
        <div className = "Leaderboard-2">
          <div className = "Hashtag-Container">
           <div className = "Card">
              <div className = "Hashtag-Title" style={{color: color2}}>#{second}</div>
              <Userlist users={hashtags[second].users} />
            </div>
          </div>
        </div>
      </div>
  );
}
