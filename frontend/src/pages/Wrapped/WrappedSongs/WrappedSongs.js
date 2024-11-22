import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import './WrappedSongs.css'; // Import the CSS file

const songs = [
  { rank: 1, title: "APT.", artist: "ROSE, Bruno Mars", image: "path/to/apt.jpg" },
  { rank: 2, title: "I Love You, I’m Sorry", artist: "Gracie Abrams", image: "path/to/iloveyou.jpg" },
  { rank: 3, title: "A Bar Song (Tipsy)", artist: "Shaboozey", image: "path/to/barsong.jpg" },
  { rank: 4, title: "Pink Pony Club", artist: "Chappell Roan", image: "path/to/pinkpony.jpg" },
  { rank: 5, title: "Guess", artist: "Charli XCX, Billie Eilish", image: "path/to/guess.jpg" },
  { rank: 6, title: "Diet Pepsi", artist: "Addison Rae", image: "path/to/dietpepsi.jpg" },
  { rank: 7, title: "A Bar Song (Tipsy)", artist: "Shaboozey", image: "path/to/barsong.jpg" },
  { rank: 8, title: "Pink Pony Club", artist: "Chappell Roan", image: "path/to/pinkpony.jpg" },
  { rank: 9, title: "Guess", artist: "Charli XCX, Billie Eilish", image: "path/to/guess.jpg" },
  { rank: 10, title: "Diet Pepsi", artist: "Addison Rae", image: "path/to/dietpepsi.jpg" },
  { rank: 11, title: "A Bar Song (Tipsy)", artist: "Shaboozey", image: "path/to/barsong.jpg" },
  { rank: 12, title: "Pink Pony Club", artist: "Chappell Roan", image: "path/to/pinkpony.jpg" }
];

const WrappedSongs = () => {
  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Your Top Songs</h1>
        <Link
          to="/profile"
          className="exit-button"
          onClick={() => console.log("Exit clicked")}
        >
          &times;
        </Link>
      </div>

        <div className="wrapper">
      <div className="song-grid">
        {songs.map((song, index) => (
          <motion.div
            key={song.rank}
            className="song-item"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.01 } }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="https://via.placeholder.com/161x161"
              alt={`${song.title} cover`}
              className="song-cover"
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="rank">{song.rank}</div>
              <div className="song-title">{song.title}</div>
              <div className="artist">{song.artist}</div>
            </div>
          </motion.div>
        ))}
      </div>
            </div>

      <Link
        to="/top-genres" // Replace with the actual path to the next page
        className="next-button"
        onClick={() => console.log("Next page clicked")}
      >
        &#8594;
      </Link>
    </div>
  );
};

export default WrappedSongs;
