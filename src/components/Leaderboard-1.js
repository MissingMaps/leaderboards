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
  <section className="section-leaderboard">
    <div className="row">
      <h2 className="section-header">Leaderboard</h2>
    </div>
  </section>
  );
}
