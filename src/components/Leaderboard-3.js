import React from 'react';
import Userlist from './Userlist.js';

export default function (props) {
  var hashtags = props.hashtags;
  var hashtagNames = Object.keys(hashtags);
  var first = hashtagNames[0];
  var second = hashtagNames[1];
  var third = hashtagNames[2];
  return (
    <div className = "Leaderboard-Container">
      <div className = "Leaderboard-1">
        <div className = "Hashtag-Container">
          <div className = "Hashtag-Title">#{first}</div>
          <Userlist users={hashtags[first].users} />
        </div>
      </div>
      <div className = "Leaderboard-1">
        <div className = "Hashtag-Container">
          <div className = "Hashtag-Title">#{second}</div>
          <Userlist users={hashtags[second].users} />
        </div>
      </div>
      <div className = "Leaderboard-1">
        <div className = "Hashtag-Container">
          <div className = "Hashtag-Title">#{third}</div>
          <Userlist users={hashtags[third].users} />
        </div>
      </div>
    </div>
  );
}
