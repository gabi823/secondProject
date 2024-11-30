import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./WrappedAlbums.css";
import { motion } from 'framer-motion';

const WrappedAlbums = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopAlbums = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get("https://secondproject-8lyv.onrender.com/api/top-albums/", {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                setAlbums([...response.data.top_albums].reverse());
                setLoading(false);
            } catch (err) {
                console.error("Error fetching top albums:", err);
                setError(err.response?.data?.error || "Failed to load albums");
                setLoading(false);
            }
        };

        fetchTopAlbums();
    }, []);

    const handleImageClick = () => {
        if (currentIndex < albums.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handleReset = () => {
        setCurrentIndex(0);
    };

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    if (loading) return <div>Loading your top albums...</div>;
    if (error) return <div>{error}</div>;
    if (!albums.length) return <div>No albums found</div>;

    return (
        <>
            <div className="header-container">
                <h1 className="header-title">Your Top Albums</h1>
                <Link to="/profile" className="exit-link">&times;</Link>
            </div>

            <motion.div
                className="albums-container"
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
            >
                <div className="album-wrapper">
                    {[...albums].reverse().map((album, index) => (
                        <img
                            key={index}
                            className="album-image"
                            src={album.image_url}
                            alt={`Album ${index + 1}`}
                            onClick={index === albums.length - currentIndex - 1 ? handleImageClick : null} // Make only the current image clickable
                            style={{
                                top: `${200 + index * 25}px`, // Stack spacing
                                display: index > albums.length - currentIndex - 1 ? "none" : "block", // Reveal images from the front
                            }}
                        />
                    ))}

                    <div className="reveal-text">
                        {currentIndex < albums.length - 1
                            ? "Click to reveal more"
                            : <button className="reset-button" onClick={handleReset}>
                                Reset
                            </button>}
                    </div>
                    <div className="album-title">
                        {`${albums.length - currentIndex}. ${albums[currentIndex].artist} - ${albums[currentIndex].name}`}
                    </div>
                </div>
            </motion.div>

            <Link
                to="/listening-personality"
                className="next-page-link"
            >
                &#8594;
            </Link>
        </>
    );
};

export default WrappedAlbums;