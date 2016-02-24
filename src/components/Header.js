import React from 'react';

export default function () {
  return (
    <header> 
      <div className="navbar-background">
        <div className="nav-icon">
          <a href="http://missingmaps.org/">
            <img src="./assets/graphics/MissingMapsLogo-White.svg" width="94px"></img>
          </a>
        </div>
        <div className="nav-list">
          <ul>
            <a href="http://missingmaps.org/contribute/"><li className="nav-item">CONTRIBUTE</li></a>
            <a href="http://missingmaps.org/events/"><li className="nav-item">EVENTS</li></a>
            <a href="http://missingmaps.org/about/"><li className="nav-item">ABOUT</li></a>
            <li className="nav-item nav-dropdown">DISCOVER
              <div className="dropdown-content">
                <a href="http://missingmaps.org/users"><div className="nav-item">USER PROFILES</div></a>
                <a href="http://missingmaps.org/leaderboards"><div className="nav-item">LEADERBOARDS</div></a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="resp-navbar navbar-background resp-nav-dropdown">
        <p>MENU</p>
        <div className="resp-dropdown-content">
          <a href="http://missingmaps.org/contribute/"><li className="nav-item">CONTRIBUTE</li></a>
          <a href="http://missingmaps.org/events/"><li className="nav-item">EVENTS</li></a>
          <a href="http://missingmaps.org/about/"><li className="nav-item">ABOUT</li></a>
          <a href="http://missingmaps.org/users"><li className="nav-item">USER PROFILES</li></a>
          <a href="http://missingmaps.org/leaderboards"><li className="nav-item">LEADERBOARDS</li></a>
        </div>
      </div>
    </header>
  );
}

