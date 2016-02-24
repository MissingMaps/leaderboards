import React from 'react';

export default function () {
  return (
    <header> 
      <div className="navbar-background">
        <div className="nav-icon">
          <a href="http://missingmaps-demo.devseed.com/">
            <img src="./assets/graphics/MissingMapsLogo-White.svg" width="94px"></img>
          </a>
        </div>
        <div className="nav-list">
          <ul>
            <a href="http://missingmaps-demo.devseed.com/contribute/"><li className="nav-item">CONTRIBUTE</li></a>
            <a href="http://missingmaps-demo.devseed.com/events/"><li className="nav-item">EVENTS</li></a>
            <a href="http://missingmaps-demo.devseed.com/about/"><li className="nav-item">ABOUT</li></a>
            <li className="nav-item nav-dropdown">DISCOVER
              <div className="dropdown-content">
                <a href="http://missingmaps-users-demo.devseed.com/"><div className="nav-item">USER PROFILES</div></a>
                <a href="http://missingmaps-leaderboards-demo.devseed.com/"><div className="nav-item">LEADERBOARDS</div></a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="resp-navbar navbar-background resp-nav-dropdown">
        <p>MENU</p>
        <div className="resp-dropdown-content">
          <a href="http://missingmaps-demo.devseed.com/contribute/"><li className="nav-item">CONTRIBUTE</li></a>
          <a href="http://missingmaps-demo.devseed.com/events/"><li className="nav-item">EVENTS</li></a>
          <a href="http://missingmaps-demo.devseed.com/about/"><li className="nav-item">ABOUT</li></a>
          <a href="http://missingmaps-users-demo.devseed.com"><li className="nav-item">USER PROFILES</li></a>
          <a href="http://missingmaps-leaderboards-demo.devseed.com"><li className="nav-item">LEADERBOARDS</li></a>
        </div>
      </div>
    </header>
  );
}

