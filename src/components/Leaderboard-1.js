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
					<div className = "center-text">Trending Hashtags</div>
            <table className = "User-roll-table">
              <tbody>
                <tr>
                  <td>#MissingMaps</td>
                </tr>
                <tr>
                  <td>#SecondHashtag</td>
                </tr>
                <tr>
                  <td>#ThirdHashtag</td>
                </tr>
                <tr>
                  <td>#FourthHashtag</td>
                </tr>
                <tr>
                  <td>#FifthHashtag</td>
                </tr>
              </tbody>
            </table>
				</div>
			</div>
		</div>
  );
}
