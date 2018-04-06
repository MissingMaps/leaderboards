import React from "react";

export default function() {
  return (
    <header>
      <div className="navbar-background">
        <div className="nav-icon">
          <a href="http://missingmaps.org/">
            <img
              src="http://www.missingmaps.org/assets/graphics/meta/MM-White.svg"
              width="94px"
              alt="Missing Maps logo "
            />
          </a>
        </div>
        <div className="nav-list">
          <ul>
            <li className="nav-item nav-dropdown">
              CONTRIBUTE
              <div className="dropdown-content nav-events">
                <a href="http://www.missingmaps.org/learn/">
                  <div className="nav-item">LEARN TO MAP</div>
                </a>
                <a href="http://www.missingmaps.org/validate/">
                  <div className="nav-item">LEARN TO VALIDATE</div>
                </a>
                <a href="http://www.mapswipe.org/">
                  <div className="nav-item">MAPSWIPE</div>
                </a>
              </div>
            </li>
            <li className="nav-item nav-dropdown">
              EVENTS
              <div className="dropdown-content nav-events">
                <a href="http://www.missingmaps.org/events/">
                  <div className="nav-item">CURRENT EVENTS</div>
                </a>
                <a href="http://www.missingmaps.org/host/">
                  <div className="nav-item">ORGANIZE AN EVENT</div>
                </a>
                <a href="http://www.missingmaps.org/host/#helper-map-contents">
                  <div className="nav-item">MAPATHON SUPPORT</div>
                </a>
              </div>
            </li>
            <a href="http://www.missingmaps.org/about/">
              <li className="nav-item">ABOUT</li>
            </a>
            <a href="http://www.missingmaps.org/blog/">
              <li className="nav-item">BLOG</li>
            </a>
            <li className="nav-item nav-dropdown">
              DISCOVER
              <div className="dropdown-content">
                <a href="http://www.missingmaps.org/users/#/">
                  <div className="nav-item">USER PROFILES</div>
                </a>
                <a href="http://www.missingmaps.org/leaderboards/#/">
                  <div className="nav-item">LEADERBOARDS</div>
                </a>
                <a href="http://www.missingmaps.org/osmstats/">
                  <div className="nav-item">OSM STATS</div>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="resp-navbar navbar-background resp-nav-dropdown">
        <p>MENU</p>
        <div className="resp-dropdown-content">
          <a href="http://www.missingmaps.org/learn/">
            <li className="nav-item">LEARN TO MAP</li>
          </a>
          <a href="http://www.missingmaps.org/validate/">
            <li className="nav-item">LEARN TO VALIDATE</li>
          </a>
          <a href="http://mapswipe.org/">
            <li className="nav-item">MAPSWIPE</li>
          </a>
          <a href="http://www.missingmaps.org/events/">
            <li className="nav-item">CURRENT EVENTS</li>
          </a>
          <a href="http://www.missingmaps.org/host/">
            <li className="nav-item">ORGANIZE AN EVENT</li>
          </a>
          <a href="http://www.missingmaps.org/about/">
            <li className="nav-item">ABOUT</li>
          </a>
          <a href="http://www.missingmaps.org/blog/">
            <li className="nav-item">BLOG</li>
          </a>
          <a href="http://www.missingmaps.org/users/#/">
            <li className="nav-item">USER PROFILES</li>
          </a>
          <a href="http://www.missingmaps.org/leaderboards/#/">
            <li className="nav-item">LEADERBOARDS</li>
          </a>
        </div>
      </div>
    </header>
  );
}
