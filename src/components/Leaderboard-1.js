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
          <div className = "Hashtag-Title">#{first}</div>
          <Userlist users={hashtags[first].users}/>
        </div>
      </div>
      <div className = "Leaderboard-2">
        <div className = "Hashtag-Container">
          <div className = "center-text">Trending Hashtags</div>
          <table className = "User-roll-table">
            <tbody>
              <tr>
                <td>#MissingMaps</td>
              </tr>
              <tr>
                <td>#SecondHashtag</td>
              </tr>
              <tr>
                <td>#ThirdHashtag</td>
              </tr>
              <tr>
                <td>#FourthHashtag</td>
              </tr>
              <tr>
                <td>#FifthHashtag</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
