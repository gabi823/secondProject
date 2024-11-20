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
                            .reverse() // Reverse the images
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
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                style={{
                    width: 659,
                    height: 728,
                    position: 'relative',
                    background: 'white',
                    borderRadius: 20,
                    border: '1px solid black',
                }}
                variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Title and subtitle */}
          <motion.div
            style={{
              width: 589,
              height: 87,
              left: 27,
              top: 30,
              position: 'absolute',
            }}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              style={{
                color: 'black',
                fontSize: 38,
                fontFamily: 'Manrope',
                fontWeight: 700,
                wordWrap: 'break-word',
                lineHeight: 1.2,
                margin: 0,
              }}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              {title}
            </motion.h1>
            <motion.h2
              style={{
                color: 'black',
                fontSize: 18,
                fontFamily: 'Manrope',
                fontWeight: 500,
                wordWrap: 'break-word',
                margin: 0,
              }}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              {subtitle}
            </motion.h2>
          </motion.div>

          {/* Top Artist Section */}
          <motion.div
            style={{
              width: 231,
              height: 232,
              left: 391,
              top: 130,
              position: 'absolute',
            }}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              style={{
                width: 231,
                height: 232,
                background: '#D9D9D9',
                borderRadius: '50%',
                overflow: 'hidden',
              }}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <img
                src={topArtist.image}
                alt={topArtist.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>
          </motion.div>
          <motion.div
            style={{
              width: 172,
              height: 28,
              left: 421,
              top: 370,
              position: 'absolute',
            }}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h3
              style={{
                color: 'black',
                fontSize: 24,
                fontFamily: 'Manrope',
                fontWeight: 800,
                display: 'inline',
              }}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              #{topArtist.rank}
            </motion.h3>
            <motion.span
              style={{
                color: 'black',
                fontSize: 24,
                fontFamily: 'Manrope',
                fontWeight: 500,
              }}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              {' '}
              {topArtist.name}
            </motion.span>
          </motion.div>

          {/* Sections for Top Songs, Genres, and Albums */}
          <motion.div
            style={{
              width: 190,
              height: 29,
              left: 26,
              top: 140,
              position: 'absolute',
              color: 'black',
              fontSize: 24,
              fontFamily: 'Manrope',
              fontWeight: 700,
              textDecoration: 'underline',
            }}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Top Songs
          </motion.div>
          <motion.div
            style={{
              width: 190,
              height: 29,
              left: 27,
              top: 430,
              position: 'absolute',
              color: 'black',
              fontSize: 24,
              fontFamily: 'Manrope',
              fontWeight: 700,
              textDecoration: 'underline',
            }}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Top Genres
          </motion.div>
          <motion.div
            style={{
              width: 190,
              height: 29,
              left: 219,
              top: 430,
              position: 'absolute',
              color: 'black',
              fontSize: 24,
              fontFamily: 'Manrope',
              fontWeight: 700,
              textDecoration: 'underline',
            }}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            Top Albums
          </motion.div>

          {/* Dynamic lists for each category with inline formatting */}
          <motion.div
            style={{
              width: 359,
              height: 199,
              left: 26,
              top: 195,
              position: 'absolute',
            }}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            {topSongs.map((song, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <span
                  style={{
                    color: 'black',
                    fontSize: 20,
                    fontFamily: 'Manrope',
                    fontWeight: 700,
                  }}
                >
                  {index + 1}. {song.title}
                </span>
                <span
                  style={{
                    color: 'black',
                    fontSize: 16,
                    fontFamily: 'Manrope',
                    fontWeight: 500,
                    marginLeft: '8px',
                  }}
                >
                  {song.artist}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            style={{
              width: 170,
              height: 164,
              left: 26,
              top: 480,
              position: 'absolute',
            }}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            {topGenres.map((genre, index) => (
              <div
                key={index}
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontFamily: 'Manrope',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}
              >
                {index + 1}. {genre}
              </div>
            ))}
          </motion.div>

          <motion.div
            style={{
              width: 411,
              height: 205,
              left: 217,
              top: 480,
              position: 'absolute',
            }}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            {topAlbums.map((album, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <span
                  style={{
                    color: 'black',
                    fontSize: 20,
                    fontFamily: 'Manrope',
                    fontWeight: 700,
                  }}
                >
                  {index + 1}. {album.title}
                </span>
                <span
                  style={{
                    color: 'black',
                    fontSize: 16,
                    fontFamily: 'Manrope',
                    fontWeight: 500,
                    marginLeft: '8px',
                  }}
                >
                  {album.artist}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <button
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            fontFamily: 'Manrope',
            fontWeight: '400',
            color: 'black',
            border: 'solid',
            borderWidth: 1,
            borderRadius: '10px',
            cursor: 'pointer',
            backgroundColor: 'white',
          }}
        >
          Save to Profile
        </button>
      </motion.div>
    </>
  );
};

export default WrappedSummary;
