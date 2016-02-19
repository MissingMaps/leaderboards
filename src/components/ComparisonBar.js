import React from 'react';

export default function (props) {
  var color = props.totals.color + " comparison-bar";
  var edits = props.totals.edits;
  var percentage = edits * 100.0 / props.max;

  return <div className = "comparison-card">
    <div className = "comparison-number">
      {props.hashtag}
    </div>
    <div className = "comparison-bar-container">
      <div className = {color} style={{'width': percentage + "%"}}>
      </div>
    </div>
  </div>;
}
