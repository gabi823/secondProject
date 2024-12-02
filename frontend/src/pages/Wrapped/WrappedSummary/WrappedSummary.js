import React, { useState, useEffect } from 'react';
import './WrappedSummary.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DarkModeToggle from "../../../components/DarkModeToggle/DarkModeToggle";
import axios from 'axios';

const WrappedSummary = () => {
  const [topSongs, setTopSongs] = useState([]);
  const [topGenres, setTopGenres] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);
  const [topArtist, setTopArtist] = useState({ name: '', image_url: '' });
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const wrappedConfig = location.state?.wrappedConfig || {
    name: 'My Wrapped',
    timePeriod: 'medium_term'
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Token ${token}`
      };

      try {
        // Fetch all required data in parallel
        const [songsRes, genresRes, albumsRes, artistsRes, playlistImagesRes] = await Promise.all([
          axios.get('https://secondproject-8lyv.onrender.com/api/top-songs/', {
            headers,
            params: { time_range: wrappedConfig.timePeriod }
          }),
          axios.get('https://secondproject-8lyv.onrender.com/api/top-genres/', {
            headers,
            params: { time_range: wrappedConfig.timePeriod }
          }),
          axios.get('https://secondproject-8lyv.onrender.com/api/top-albums/', {
            headers,
            params: { time_range: wrappedConfig.timePeriod }
          }),
          axios.get('https://secondproject-8lyv.onrender.com/api/top-artists/', {
            headers,
            params: { time_range: wrappedConfig.timePeriod }
          }),
          axios.get('https://secondproject-8lyv.onrender.com/api/fetch-playlist-images/')
        ]);

        setTopSongs(songsRes.data.top_songs.slice(0, 5));
        setTopGenres(genresRes.data.top_genres.slice(0, 5));
        setTopAlbums(albumsRes.data.top_albums.slice(0, 5));
        setTopArtist({
          name: artistsRes.data.top_artists[0].name,
          image_url: artistsRes.data.top_artists[0].image_url
        });
        setBackgroundImages(playlistImagesRes.data.images);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (wrappedConfig.timePeriod) {
      fetchData();
    }
  }, [wrappedConfig.timePeriod]);

  const getTimeRangeLabel = (timeRange) => {
    const labels = {
      'short_term': 'Last 4 Weeks',
      'medium_term': 'Last 6 Months',
      'long_term': 'All Time'
    };
    return labels[timeRange] || timeRange;
  };

  // Background image rows
  const renderImageRow = (images, className) => {
    // Calculate how many images are needed to fill the screen
    const duplicates = Math.ceil(window.innerWidth / (images.length * 100)); // Assuming each image is 100px wide

    return (
      <div className={className}>
        {[...Array(duplicates)].map((_, i) => (
          <React.Fragment key={i}>
            {images.map((image, index) => (
              <img
                key={`${i}-${index}`}
                src={image}
                alt={`Background ${index + 1}`}
                className="carousel-image"
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    );
  };

  if (loading) {
    return <div> </div>;
  }

  return (
    <>
      <div className="header">
        <h1 className="header-title"></h1>
        <Link to="/profile" className="exit-button">&times;</Link>
      </div>

      <motion.div
        className="background"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
      >
        {/* Top row - top songs album covers */}
        {renderImageRow(topSongs.map(song => song.cover_image), 'image-row-top')}

        {/* Middle row - top albums covers */}
        {renderImageRow(topAlbums.map(album => album.image_url), 'image-row-middle')}

        {/* Bottom row - playlist images */}
        {renderImageRow(topSongs.map(song => song.cover_image), 'image-row-bottom')}
      </motion.div>

      <motion.div className="container">
        <motion.div className="card">
          <motion.div className="title-section">
            <h1 className="title">You've reached the end...</h1>
            <h2 className="subtitle">
              Here's an overview of {getTimeRangeLabel(wrappedConfig.timePeriod)}:
            </h2>
          </motion.div>

          {/* Top Artist Section */}
          <div className="top-artist-image-container">
            <div className="top-artist-circle">
              <img src={topArtist.image_url} alt={topArtist.name} />
            </div>
          </div>
          <div className="top-artist-rank">
            <h3 className="top-artist-rank-number">#1</h3>
            <span className="top-artist-name">{topArtist.name}</span>
          </div>

          {/* Section Titles */}
          <div className="top-songs-section-title">Top Songs</div>
          <div className="top-genres-section-title">Top Genres</div>
          <div className="top-albums-section-title">Top Albums</div>

          {/* Top Songs List */}
          <div className="top-songs-section">
            {topSongs.map((song, index) => (
              <div key={index} className="top-songs-item">
                <span className="top-songs-title">{index + 1}. {song.song_title}</span>
                <span className="top-songs-artist">{song.artist_name}</span>
              </div>
            ))}
          </div>

          {/* Top Genres List */}
          <div className="top-genres-section">
            {topGenres.map((genre, index) => (
              <div key={index} className="top-genres-item">
                {index + 1}. {genre.name}
              </div>
            ))}
          </div>

          {/* Top Albums List */}
          <div className="top-albums-section">
            {topAlbums.map((album, index) => (
                <div key={index} className="top-albums-item">
                  <span className="top-albums-title">{index + 1}. {album.name}</span>
                  <span className="top-albums-artist">{album.artist}</span>
                </div>
            ))}
            <br></br>
            <br></br>
            <br></br>
            <Link to="/profile" className="save-button">Back to Profile</Link>
          </div>
        </motion.div>
      </motion.div>
      <DarkModeToggle />
    </>
  );
};

export default WrappedSummary;
