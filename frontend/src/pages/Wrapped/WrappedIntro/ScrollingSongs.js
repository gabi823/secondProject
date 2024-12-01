import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ScrollingSongs = () => {
  const [songs, setSongs] = useState({
    row1: [],
    row2: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSongs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://secondproject-8lyv.onrender.com/api/top-songs/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });


        // Get the cover images from the response
        const songImages = response.data.top_songs.map(song => song.cover_image);

        // Duplicate the arrays for seamless looping like in Welcome.js
        setSongs({
          row1: [...songImages, ...songImages, ...songImages],
          row2: [...songImages, ...songImages, ...songImages]
        });

      } catch (error) {
        console.error('Error fetching top songs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSongs();
  }, []);

  if (loading) {
    return (
      <div className="background">
        <div className="image-row-top">
          {[...Array(18)].map((_, index) => (
            <img
              key={`loading-top-${index}`}
              alt="  "
              className="carousel-image"
            />
          ))}
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br />
        <div className="image-row-bottom">
          {[...Array(18)].map((_, index) => (
            <img
              key={`loading-bottom-${index}`}
              alt=" "
              className="carousel-image"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="background"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }}
    >
      <div className="image-row-top">
        {songs.row1.map((image, index) => (
          <img
            key={`top-${index}`}
            src={image}
            alt={`Song ${index + 1}`}
            className="carousel-image"
          />
        ))}
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br />
      <div className="image-row-bottom">
        {songs.row2.map((image, index) => (
          <img
            key={`bottom-${index}`}
            src={image}
            alt={`Song ${index + 1}`}
            className="carousel-image"
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ScrollingSongs;