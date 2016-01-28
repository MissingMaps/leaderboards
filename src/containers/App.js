import React from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import HashtagNav from '../containers/HashtagNav.js';

export default React.createClass({
  render: function () {
    return (
      <div>
        <Header />
        <div>
          <div id = "Page-Container">
            <HashtagNav id={this.props.params.id} history={this.props.history}/>
            {this.props.children}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
});
