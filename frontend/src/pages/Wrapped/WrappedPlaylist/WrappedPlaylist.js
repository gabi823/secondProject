import React from 'react';
import './WrappedPlaylist.css';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";


const WrappedPlaylist = () => {

	const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Delay between children animations
    },
  },
};

	const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }, // Individual element duration
  },
};


  	return (
		<div className="wrappedPlaylist">
			<div className="header">
				<h1 className="header-title">We made a playlist for you...</h1>
				<Link to="/profile" className="exit-button" onClick={() => console.log("Exit clicked")}>&times;</Link>
			</div>
			<motion.div className="playlist"
				initial="hidden"
                animate="visible"
                variants={containerVariants}
			>
				<motion.img className="screenshot20241022At218" alt="" src="https://via.placeholder.com/481x481" variants={childVariants}/>
				<motion.div className="text-container" variants={childVariants}>
					<motion.b className="yourUsernameThePersonalityContainer" variants={childVariants}>
						{"your_username, the "}
						<span className="insertPersonalityType">Personality Type</span>
					</motion.b>
					<motion.div className="songs3hr12min" variants={childVariants}>50 songs, 3hr 12min</motion.div>
					<motion.div className="wrappedPlaylistChild" variants={childVariants}>
						<div className="addToYour">Add to your Library</div>
					</motion.div>
					<motion.div className="aBlendOf" variants={childVariants}>
						A blend of familiar favorites and brand new songs that represent you and your music taste in this moment of time.
					</motion.div>
				</motion.div>
			</motion.div>
			<Link
        to="/wrapped-summary" // Replace with the actual path to the next page
        className="next-button"
        onClick={() => console.log("Next page clicked")}
      >
        &#8594;
      </Link>
		</div>
	);
};

export default WrappedPlaylist;