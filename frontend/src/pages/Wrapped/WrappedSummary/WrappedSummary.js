import React from 'react';
import './WrappedSummary.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const WrappedSummary = ({ userData = {} }) => {
  const {
    title = 'You’ve reached the end...',
    subtitle = 'Here’s an overview of everything:',
    topArtist = {
      rank: 1,
      name: 'Taylor Swift',
      image: 'https://via.placeholder.com/231x232',
    },
    topSongs = [
      { title: 'APT.', artist: 'Rose, Bruno Mars' },
      { title: 'I Love You, I’m Sorry', artist: 'Gracie Abrams' },
      { title: 'A Bar Song (Tipsy)', artist: 'Shaboozey' },
      { title: 'Pink Pony Club', artist: 'Chappell Roan' },
      {
        title: 'Guess featuring Billie Eilish',
        artist: 'Charli XCX, Billie Eilish',
      },
    ],
    topGenres = ['Pop', 'Indie Pop', 'Rap', 'K-Pop', 'Rock'],
    topAlbums = [
      { title: 'HIT ME HARD AND SOFT', artist: 'Billie Eilish' },
      { title: 'Short n’ Sweet', artist: 'Sabrina Carpenter' },
      { title: 'BRAT', artist: 'Charli XCX' },
      {
        title: 'The Rise and Fall of a Midwest Princess',
        artist: 'Chappell Roan',
      },
      { title: 'Eternal Sunshine', artist: 'Ariana Grande' },
    ],
  } = userData;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChilden: 0.3, duration: 0.8 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <>
      <div className="header">
        <h1 className="header-title"></h1>
        <Link
          to="/profile"
          className="exit-button"
          onClick={() => console.log('Exit clicked')}
        >
          &times;
        </Link>
      </div>

      <motion.div
        className="background"
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
      >
        <div className="image-row-top">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              {Array.from({length: 9}).map((_, index) => (
                <img
                  key={index + i * 9}
                  src="https://via.placeholder.com/161x161"
                  alt={`Placeholder image ${index + 1 + i * 9}`}
                  className="carousel-image"
                />
              ))}
            </React.Fragment>
          ))}
        </div>
        <div className="image-row-middle">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              {Array.from({length: 9})
                .reverse()
                .map((_, index) => (
                  <img
                    key={index + i * 9}
                    src="https://via.placeholder.com/161x161"
                    alt={`Placeholder image ${index + 1 + i * 9}`}
                    className="carousel-image"
                  />
                ))}
            </React.Fragment>
          ))}
        </div>
        <div className="image-row-bottom">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              {Array.from({length: 9}).map((_, index) => (
                <img
                  key={index + i * 9}
                  src="https://via.placeholder.com/161x161"
                  alt={`Placeholder image ${index + 1 + i * 9}`}
                  className="carousel-image"
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="card"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Title and subtitle */}
          <motion.div
            className="title-section"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="title"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              {title}
            </motion.h1>
            <motion.h2
              className="subtitle"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              {subtitle}
            </motion.h2>
          </motion.div>

          {/* Top Artist Section */}
          <motion.div
            className="top-artist-image-container"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="top-artist-circle"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <img
                src={topArtist.image}
                alt={topArtist.name}
              />
            </motion.div>
          </motion.div>
          <motion.div
            className="top-artist-rank"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h3
              className="top-artist-rank-number"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              #{topArtist.rank}
            </motion.h3>
            <motion.span
              className="top-artist-name"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              {' '}
              {topArtist.name}
            </motion.span>
          </motion.div>

          {/* Top Songs Section Title */}
          <motion.div
            className="top-songs-section-title"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Top Songs
          </motion.div>

          {/* Top Genres Section Title */}
          <motion.div
            className="top-genres-section-title"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Top Genres
          </motion.div>

          {/* Top Albums Section Title */}
          <motion.div
            className="top-albums-section-title"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Top Albums
          </motion.div>

          {/* Dynamic lists for each category */}
          <motion.div
            className="top-songs-section"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            {topSongs.map((song, index) => (
              <div key={index} className="top-songs-item">
                <span className="top-songs-title">
                  {index + 1}. {song.title}
                </span>
                <span className="top-songs-artist">
                  {song.artist}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="top-genres-section"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            {topGenres.map((genre, index) => (
              <div
                key={index}
                className="top-genres-item"
              >
                {index + 1}. {genre}
              </div>
            ))}
          </motion.div>

          <motion.div
            className="top-albums-section"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            {topAlbums.map((album, index) => (
              <div key={index} className="top-albums-item">
                <span className="top-albums-title">
                  {index + 1}. {album.title}
                </span>
                <span className="top-albums-artist">
                  {album.artist}
                </span>
              </div>
            ))}

            <button
              className="save-button"
            >
              Save to Profile
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default WrappedSummary;