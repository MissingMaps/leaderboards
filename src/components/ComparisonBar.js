import React from 'react';

export default function (props) {
  var color = props.totals.color;
  var edits = props.totals.edits;
  console.log(color, edits);
  return <div className = "comparison-card">
    <div className = "comparison-number">
      {props.hashtag}
    </div>
    <div className = "comparison-bar-container">
      <div className = "comparison-bar">
      </div>
    </div>
  </div>;
}
