import React from 'react';
import './WrappedPlaylist.css';
import { Link } from 'react-router-dom';

const WrappedPlaylist = () => {
  	return (
		<div className="wrappedPlaylist">
			<div className="header">
				<h1 className="header-title">We made a playlist for you...</h1>
				<Link to="/profile" className="exit-button" onClick={() => console.log("Exit clicked")}>&times;</Link>
			</div>
			<div className="playlist">
				<img className="screenshot20241022At218" alt="" src="https://via.placeholder.com/481x481"/>
				<div className="text-container">
					<b className="yourUsernameThePersonalityContainer">
						{"your_username, the "}
						<span className="insertPersonalityType">Personality Type</span>
					</b>
					<div className="songs3hr12min">50 songs, 3hr 12min</div>
					<div className="wrappedPlaylistChild">
						<div className="addToYour">Add to your Library</div>
					</div>
					<div className="aBlendOf">
						A blend of familiar favorites and brand new songs that represent you and your music taste in this moment of time.
					</div>
				</div>
			</div>
			<Link
				to="/wrapped-summary"
				className="next-page-button"
				onClick={() => console.log("Next page clicked")}
			>
				&#8594;
			</Link>
		</div>
	);
};

export default WrappedPlaylist;
