import React from 'react';
import Toggle from '../components/ToggleSwitch.js';

export default function () {
  return (
		<div className='Leaderboard-Stats-Container'>
			<div className='Hashtag-Timeline-Container'>
				<div className='Hashtag-Timeline'>
				</div>
				<div className='Stats-Content'>
					<div className = 'Stats-Togglebox'>
						<Toggle />
					</div>
				</div>
			</div>
		</div>
  );
}
