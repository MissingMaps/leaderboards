import React from 'react';

export default function (props) {
  var color = 'comparison-bar ' + props.totals.color;
  var edits = props.totals.edits;
  var textcolor = props.totals.color + '-proj comparison-number';
  var percentage = edits * 100.0 / props.max;

  return <div className = "comparison-card">
    <div className = {textcolor}>
      {props.hashtag}
    </div>
    <div className = "comparison-bar-container">
      <div className = {color} style={{'width': percentage + '%'}}>
      </div>
    </div>
  </div>;
}
