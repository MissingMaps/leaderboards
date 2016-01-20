import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

class HomePage extends React.Component{

	render(){
		return (
			<div>
	      <Header />
				<div>
					<div className = "white"></div>
						<div id = "Leaderboard-Container">
							<div id = "Main-Container">
							</div>
						</div>
					<Footer />
				</div>
			</div>
			// <div id="wrapper">
			// 	<div ClassName="row">
			// 		<div ClassName="largetop-col">
			// 			<h1>Hashtag Container</h1>
			// 		</div>
			// 		<div ClassName="smalltop-col">
			// 			<h1>Viewtop Toggle</h1>
			// 		</div>
			// 	</div>
			// <div ClassName="left-col">
			// 	<div ClassName="row">
			// 		<div ClassName="box-small"></div>
			// 	</div>
			// <div ClassName="box-med"></div>
			// </div>

			// <div ClassName="right-col"
			// </div>
			// </div>
		)
	}
}

export default HomePage;