import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./WrappedAlbums.css";
import { motion } from 'framer-motion';


const WrappedAlbums = () => {
    // State to track the current index of the top image
    const [currentIndex, setCurrentIndex] = useState(0);

    // Sample album data
    const albums = [
        "Artist 1 - Album 1",
        "Artist 2 - Album 2",
        "Artist 3 - Album 3",
        "Artist 4 - Album 4",
        "Artist 5 - Album 5",
        "Artist 6 - Album 6",
        "Artist 7 - Album 7",
        "Artist 8 - Album 8",
        "Artist 9 - Album 9",
        "Artist 10 - Album 10",
    ];

    const handleImageClick = () => {
        // Increment the index if not the last image
        if (currentIndex < albums.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
            console.log("No more images to reveal.");
        }
    };

    const handleReset = () => {
        setCurrentIndex(0); // Reset to the initial state
    };

    // Framer Motion animation variants
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <>
            <div className="header-container">
                <h1 className="header-title">Your Top Albums</h1>
                <Link
                    to="/profile"
                    className="exit-link"
                    onClick={() => console.log("Exit clicked")}
                >
                    &times;
                </Link>
            </div>

            <motion.div className="albums-container"
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
            >
                <div className="album-wrapper">
                    {[...Array(10)].map((_, index) => (
                        <img
                            key={index}
                            className="album-image"
                            src="https://via.placeholder.com/405x405"
                            alt={`Album ${index + 1}`}
                            onClick={index === albums.length - currentIndex - 1 ? handleImageClick : null} // Clickable for the last image first
                            style={{
                                top: `${200 + index * 25}px`,
                                display: index >= albums.length - currentIndex ? "none" : "block", // Hide images from the last upward
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
                    <div className="album-title">{`${
                        albums.length - currentIndex // Counts down from 10 to 1
                    }. ${albums[albums.length - currentIndex - 1]}`}</div>
                </div>


            </motion.div>

            <Link
                to="/listening-personality"
                className="next-page-link"
                onClick={() => console.log("Next page clicked")}
            >
                &#8594;
            </Link>
        </>
    )
        ;
};

export default WrappedAlbums;
