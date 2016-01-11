import React from 'react';

export default React.createClass({
  
  render: function () {
    return <div>{this.props.params.id}</div>;
  }
});
