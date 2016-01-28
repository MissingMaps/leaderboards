import React from 'react';
import Userlist from './Userlist.js';

export default function (props) {
  var hashtags = props.hashtags;
  var hashtagNames = Object.keys(hashtags);
  var first = hashtagNames[0];
  var second = hashtagNames[1];
  return (
    <div className = "Leaderboard-Container">
      <div className = "Leaderboard-2">
        <div className = "Hashtag-Container">
          <div className = "Card">
            <div className = "Hashtag-Title">#{first}</div>
            <Userlist users={hashtags[first].users} />
          </div>
        </div>
      </div>
        <div className = "Leaderboard-2">
          <div className = "Hashtag-Container">
           <div className = "Card">          
              <div className = "Hashtag-Title">#{second}</div>
              <Userlist users={hashtags[second].users} />
            </div>
          </div>
        </div>
      </div>
  );
}
