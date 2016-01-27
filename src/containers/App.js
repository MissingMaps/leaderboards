import React from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import HashtagNav from '../components/HashtagNav.js';

export default React.createClass({
  render: function () {
    return (
      <div>
        <Header />
        <div>
          <div id = "Page-Container">
            <HashtagNav />
            {this.props.children}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
});
