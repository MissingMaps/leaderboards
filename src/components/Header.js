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
        <div class="nav-list">
          <ul>
            <li class="nav-item nav-dropdown">
              CONTRIBUTE
              <div class="dropdown-content nav-events">
                <a href="http://www.missingmaps.org/learn/">
                  <div class="nav-item">LEARN TO MAP</div>
                </a>
                <a href="http://www.missingmaps.org/validate/">
                  <div class="nav-item">LEARN TO VALIDATE</div>
                </a>
                <a href="http://www.mapswipe.org/">
                  <div class="nav-item">MAPSWIPE</div>
                </a>
              </div>
            </li>
            <li class="nav-item nav-dropdown">
              EVENTS
              <div class="dropdown-content nav-events">
                <a href="http://www.missingmaps.org/events/">
                  <div class="nav-item">CURRENT EVENTS</div>
                </a>
                <a href="http://www.missingmaps.org/host/">
                  <div class="nav-item">ORGANIZE AN EVENT</div>
                </a>
                <a href="http://www.missingmaps.org/host/#helper-map-contents">
                  <div class="nav-item">MAPATHON SUPPORT</div>
                </a>
              </div>
            </li>
            <a href="http://www.missingmaps.org/about/">
              <li class="nav-item">ABOUT</li>
            </a>
            <a href="http://www.missingmaps.org/blog/">
              <li class="nav-item">BLOG</li>
            </a>
            <li class="nav-item nav-dropdown">
              DISCOVER
              <div class="dropdown-content">
                <a href="http://www.missingmaps.org/users/#/">
                  <div class="nav-item">USER PROFILES</div>
                </a>
                <a href="http://www.missingmaps.org/leaderboards/#/">
                  <div class="nav-item">LEADERBOARDS</div>
                </a>
                <a href="http://www.missingmaps.org/osmstats/">
                  <div class="nav-item">OSM STATS</div>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="resp-navbar navbar-background resp-nav-dropdown">
        <p>MENU</p>
        <div class="resp-dropdown-content">
          <a href="http://www.missingmaps.org/learn/">
            <li class="nav-item">LEARN TO MAP</li>
          </a>
          <a href="http://www.missingmaps.org/validate/">
            <li class="nav-item">LEARN TO VALIDATE</li>
          </a>
          <a href="http://mapswipe.org/">
            <li class="nav-item">MAPSWIPE</li>
          </a>
          <a href="http://www.missingmaps.org/events/">
            <li class="nav-item">CURRENT EVENTS</li>
          </a>
          <a href="http://www.missingmaps.org/host/">
            <li class="nav-item">ORGANIZE AN EVENT</li>
          </a>
          <a href="http://www.missingmaps.org/about/">
            <li class="nav-item">ABOUT</li>
          </a>
          <a href="http://www.missingmaps.org/blog/">
            <li class="nav-item">BLOG</li>
          </a>
          <a href="http://www.missingmaps.org/users/#/">
            <li class="nav-item">USER PROFILES</li>
          </a>
          <a href="http://www.missingmaps.org/leaderboards/#/">
            <li class="nav-item">LEADERBOARDS</li>
          </a>
        </div>
      </div>
    </header>
  );
}
