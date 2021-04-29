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
          <li class="nav-item nav-dropdown">LEARN
    					<div class="dropdown-content">
    						<a href="/beginner/"><div class="nav-item">BEGINNER MAPPING</div></a>
    						<a href="/advanced/"><div class="nav-item">ADVANCED MAPPING</div></a>
    						<a href="/field/"><div class="nav-item">FIELD MAPPING</div></a>
    						<a href="/validate/"><div class="nav-item">VALIDATION</div></a>
    						<a href="/mapswipe/"><div class="nav-item">MAPSWIPE</div></a>
    					</div>
    				</li>
    				<li class="nav-item nav-dropdown">EVENTS
    					<div class="dropdown-content">
    						<a href="/events/"><div class="nav-item">CURRENT EVENTS</div></a>
    						<a href="/host/"><div class="nav-item">ORGANIZE AN EVENT</div></a>
    						<a href="/host/#helper-map-contents"><div class="nav-item">MAPATHON SUPPORT</div></a>
    					</div>
    				</li>
    				<a href="/about/">
    					<li class="nav-item">ABOUT</li>
    				</a>
    				<a href="/blog/">
    					<li class="nav-item">BLOG</li>
    				</a>
    				<li class="nav-item nav-dropdown">EXPLORE
    					<div class="dropdown-content">
    						<a href="http://www.missingmaps.org/users/"><div class="nav-item">USER PROFILES</div></a>
    						<a href="http://www.missingmaps.org/leaderboards/"><div class="nav-item">LEADERBOARDS</div></a>
    						<a href="/statistics/"><div class="nav-item">STATISTICS</div></a>
    					</div>
    				</li>
          </ul>
        </div>
      </div>
      <div className="resp-navbar navbar-background resp-nav-dropdown">
        <p>MENU</p>
        <div className="resp-dropdown-content">
          <a href="/beginner/">
    				<li class="nav-item">BEGINNER MAPPING</li>
    			</a>
    			<a href="/advanced/">
    				<li class="nav-item">ADVANCED MAPPING</li>
    			</a>
    			<a href="/field/">
    				<li class="nav-item">FIELD MAPPING</li>
    			</a>
    			<a href="/validate/">
    				<li class="nav-item">VALIDATION</li>
    			</a>
    			<a href="/mapswipe/">
    				<li class="nav-item">MAPSWIPE</li>
    			</a>
    			<a href="/events/">
    				<li class="nav-item">CURRENT EVENTS</li>
    			</a>
    			<a href="/host/">
    				<li class="nav-item">ORGANIZE AN EVENT</li>
    			</a>
    			<a href="/host/#helper-map-contents">
    				<li class="nav-item">MAPATHON SUPPORT</li>
    			</a>
    			<a href="/about/">
    				<li class="nav-item">ABOUT</li>
    			</a>
    			<a href="/blog/">
    				<li class="nav-item">BLOG</li>
    			</a>
    			<a href="http://www.missingmaps.org/users/">
    				<li class="nav-item">USER PROFILES</li>
    			</a>
    			<a href="http://www.missingmaps.org/leaderboards/">
    				<li class="nav-item">LEADERBOARDS</li>
    			</a>
    			<a href="/statistics/">
    				<li class="nav-item">STATISTICS</li>
    			</a>
        </div>
      </div>
    </header>
  );
}
