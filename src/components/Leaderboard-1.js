import React from 'react';
import Userlist from './Userlist.js';

export default function (props) {
  var hashtagNames = Object.keys(props.hashtags);
  var hashtags = props.hashtags;
  var first = hashtagNames[0];
  return (
    <div className = "Leaderboard-Container">
      <div className = "Leaderboard-2">
        <div className = "Hashtag-Container">
          <div className = "Card">
            <div className = "Hashtag-Title">#{first}</div>
            <Userlist users={hashtags[first].users}/>
          </div>
        </div>
      </div>
    </div>
  );
}
