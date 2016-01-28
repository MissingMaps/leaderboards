import React from 'react';
import HashtagNav from '../containers/HashtagNav.js';

export default React.createClass({
  render: function () {
    return (
      <div>
        <div>
          <div id = "Page-Container">
            <HashtagNav id={this.props.params.id} history={this.props.history}/>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});
