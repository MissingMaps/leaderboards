import React from 'react';

var Userlist = React.createClass({
  render: function () {
    if (typeof this.props.users === 'undefined') {
      return <div></div>;
    }
    var component = this;
    var list = Object.keys(this.props.users)
    .map(function (key) {
      return (<li key={key}>{key}: {component.props.users[key]}</li>);
    });
    return (
      <ul>
      {list}
      </ul>
      );
  }
});

export default function (users) {
  return (
		<div className = "Leaderboard-Container">
			<div className = "Leaderboard-2">
				<div className = "Hashtag-Container">
					<div className = "Hashtag-Title">#MissingMaps</div>
					<div className = "User-roll">
            <table className = "User-roll-table">
              <tbody>
                <tr>
                	<th>1.</th>
                  <th>AwesomeUser</th>
                  <th>10,192</th>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>AwesomeUser</td>
                  <td>5,201</td>
                </tr>
                <tr>
                  <td>3.</td>
                  <td>AwesomeUser</td>
                  <td>5,201</td>
                </tr>
                <tr>
                  <td>4.</td>
                  <td>AwesomeUser</td>
                  <td>5,201</td>
                </tr>
                <tr>
                  <td>5.</td>
                  <td>AwesomeUser</td>
                  <td>5,201</td>
                </tr>
              </tbody>
            </table>
					</div>
				</div>
			</div>
			<div className = "Leaderboard-2">
				<div className = "Hashtag-Container">
					<div className = "Hashtag-Title"></div>
						<p>The Kigoma Region is the region between Burundi and Tanzania where Burundian refugees cross the border. A cholera outbreak is now spreading in this area, especially in the town of Kigoma and the refugee camp of Nyagurusu. NGOs on the ground need better road and residential area data to respond, especially on the Tanzanian side which is much less mapped than Burundi.</p>
						<p>The Missing Maps project aims to map the most vulnerable places in the world (affected by humanitarian crises: disease epidemics, conflict, natural disasters, poverty, environmental crises). Building on HOT's disaster preparedness projects, the Missing Maps tasks facilitate pre-emptive mapping of priority countries to better facilitate disaster response, medical activities and resource allocation when crises occur.</p>
				</div>
			</div>
		</div>
  );
}
