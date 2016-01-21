import React from 'react';
import Toggle from '../components/ToggleSwitch.js';

export default function (data) {
  var stats = data.data.stats;

  return (
		<div className='Leaderboard-Stats-Container'>
			<div className='Hashtag-Timeline-Container'>
				<div className='Hashtag-Timeline'>
				</div>
				<div className='Stats-Content'>
					<div className = 'Stats-Togglebox'>
						<Toggle />
					</div>
					<div className = 'Stats-Statbox'>
            <table className = "table-curve">
              <tbody>
                <tr>
                  <th>Total Edits</th>
                  <th>12,205,910</th>
                </tr>
                <tr>
                  <td>Roads</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <td>km of Roads</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <td>km of Waterways</td>
                  <td>1000</td>
                </tr>
                <tr>
                  <td>Point of Interests</td>
                  <td>1000</td>
                </tr>
              </tbody>
            </table>
					</div>
				</div>
			</div>
		</div>
  );
}
