import React from 'react';

export default function () {
  document.querySelectorAll('.Additional');
  return (
		<div className='Leaderboard-Navbar-Container'>
			<div className='LN-Hashtag-Container'>
				<div className='Current-Hashtag'>
					<div className='killswitch'>x</div>
					#MissingMaps
				</div>
				<div className='Current-Hashtag Additional'>
					+
				</div>
				<div className='Input-Hashtag'>
					<input type="text" name="firstname"/>
				</div>
			</div>
			<div className='LN-View-Navigation'>
				<div className='View-Toggle'>Leaderboards</div>
				<div className='View-Toggle'>Map Wow!</div>
			</div>
		</div>
  );
}
