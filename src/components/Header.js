import React from "react";

export default function() {
  return (
    <header>
      <div className="navbar-background">
        <div className="nav-icon">
          <a href="http://missingmaps.org/">
            <img
              src="https://www.missingmaps.org/assets/graphics/meta/MM_white_typography.svg"
              width="94px"
              alt="Missing Maps logo "
            />
          </a>
        </div>
        <div className="nav-list">
          <ul>
            <li className="nav-item nav-dropdown">
              LEARN
              <div className="dropdown-content nav-events">
                <a href="https://www.missingmaps.org/beginner/">
                  <div className="nav-item">BEGINNER MAPPING</div>
                </a>
                <a href="https://www.missingmaps.org/advanced/">
                  <div className="nav-item">ADVANCED MAPPING</div>
                </a>
                <a href="https://www.missingmaps.org/field/">
                  <div className="nav-item">FIELD MAPPING</div>
                </a>
                <a href="https://www.missingmaps.org/validate/">
                  <div className="nav-item">VALIDATION</div>
                </a>
                <a href="https://www.missingmaps.org/mapswipe/">
                  <div className="nav-item">MAPSWIPE</div>
                </a>
              </div>
            </li>
            <li className="nav-item nav-dropdown">
              EVENTS
              <div className="dropdown-content nav-events">
                <a href="https://www.missingmaps.org/events/">
                  <div className="nav-item">CURRENT EVENTS</div>
                </a>
                <a href="https://www.missingmaps.org/host/">
                  <div className="nav-item">ORGANIZE AN EVENT</div>
                </a>
                <a href="https://www.missingmaps.org/host/#helper-map-contents">
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
              EXPLORE
              <div className="dropdown-content">
                <a href="https://www.missingmaps.org/users/#/">
                  <div className="nav-item">USER PROFILES</div>
                </a>
                <a href="https://www.missingmaps.org/leaderboards/#/">
                  <div className="nav-item">LEADERBOARDS</div>
                </a>
                <a href="http://www.missingmaps.org/statistics/">
                  <div className="nav-item">STATISTICS</div>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="resp-navbar navbar-background resp-nav-dropdown">
        <p>MENU</p>
        <div className="resp-dropdown-content">
          <a href="https://www.missingmaps.org/beginner/">
            <li className="nav-item">BEGINNER MAPPING</li>
          </a>
          <a href="https://www.missingmaps.org/advanced/">
            <li className="nav-item">ADVANCED MAPPING</li>
          </a>
          <a href="https://www.missingmaps.org/field/">
            <li className="nav-item">FIELD MAPPING</li>
          </a>
          <a href="https://www.missingmaps.org/validate/">
            <li className="nav-item">VALIDATION</li>
          </a>
          <a href="https://www.missingmaps.org/mapswipe/">
            <li className="nav-item">MAPSWIPE</li>
          </a>
          <a href="https://www.missingmaps.org/events/">
            <li className="nav-item">CURRENT EVENTS</li>
          </a>
          <a href="https://www.missingmaps.org/host/">
            <li className="nav-item">ORGANIZE AN EVENT</li>
          </a>
          <a href="https://www.missingmaps.org/host/#helper-map-contents">
            <li className="nav-item">MAPATHON SUPPORT</li>
          </a>
          <a href="https://www.missingmaps.org/about/">
            <li className="nav-item">ABOUT</li>
          </a>
          <a href="https://www.missingmaps.org/blog/">
            <li className="nav-item">BLOG</li>
          </a>
          <a href="http://www.missingmaps.org/users/">
            <li className="nav-item">USER PROFILES</li>
          </a>
          <a href="http://www.missingmaps.org/leaderboards/">
            <li className="nav-item">LEADERBOARDS</li>
          </a>
          <a href="https://www.missingmaps.org/statistics/">
            <li className="nav-item">STATISTICS</li>
          </a>
        </div>
      </div>
    </header>
  );
}
