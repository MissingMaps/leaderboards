import React from 'react';
import Leaderboard1 from '../components/Leaderboard-1.js';
import Leaderboard2 from '../components/Leaderboard-2.js';
import Leaderboard3 from '../components/Leaderboard-3.js';
import LeaderboardMap from '../components/Leaderboard-map.js';

export default React.createClass({
	render: function () {
		var props = this.props.data;
		var whichView = {};
		if (props.numRolls === 1) {
			whichView = <Leaderboard1 data={props.users} />;
		} else if (props.numRolls === 2) {
			whichView = <Leaderboard2 data={props.users} />;
		} else {
			whichView = <Leaderboard3 data={props.users} />;
		}
		return (
		<div>
		{whichView}
		</div>
		);
	}
});
