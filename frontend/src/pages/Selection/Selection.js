import React, { useEffect, useState } from 'react';
import NavBarLoggedIn from "../../components/NavBarLoggedIn/NavBarLoggedIn";
import { motion } from 'framer-motion';
import './Selection.css';
import axios from 'axios';

const Selection = () => {
    const [images, setImages] = useState({
        column1: [],
    });
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/fetch-playlist-images/');
                const fetchedImages = response.data.images;

                // Divide images into a single column and duplicate for smooth scrolling if needed
                const column1Images = fetchedImages.slice(0, 10);

                const newImages = {
                    column1: [...column1Images, ...column1Images], // Duplicate for smooth scrolling
                };

                setImages(newImages);
                setImagesLoaded(true); // Only set to true after images are fetched and set
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);

    // Variants for individual text lines
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };

    return (
        <>
            <NavBarLoggedIn />
            <div className="selection-container">
                {imagesLoaded ? (
                    // Main content rendered after images are loaded
                    <div className="main-container">
                        {/* Left Section */}
                        <div className="selection-left-container">
                            {/* Title */}
                            <motion.div
                                className="selection-title"
                                initial="hidden"
                                animate="visible"
                                variants={textVariants} // Individual text animation
                            >
                                Let’s look back, shall we?
                            </motion.div>

                            {/* Profile Wrapped */}
                            <motion.div
                                className="profile-wrapped"
                                initial="hidden"
                                animate="visible"
                                variants={textVariants} // Individual text animation
                            >
                                <div className="profile-wrapped-label">Name Your Wrapped:</div>
                                <input
                                    type="text"
                                    placeholder="Enter a name"
                                    className="wrapped-input"
                                />
                            </motion.div>

                            {/* Actions */}
                            <motion.div
                                className="selection-actions"
                                initial="hidden"
                                animate="visible"
                                variants={textVariants} // Individual text animation
                            >
                                <div className="dropdown-container">
                                    <select className="dropdown-select">
                                        <option value="" disabled selected>Select time period</option>
                                        <option value="short">Short Term</option>
                                        <option value="medium">Medium Term</option>
                                        <option value="long">Long Term</option>
                                    </select>
                                    <span className="dropdown-arrow">▼</span>
                                </div>

                                <div className="go-button">
                                    <span>Go</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Section */}
                        <div className="selection-right-container">
                            {images.column1.map((image, index) => (
                                <img
                                    key={index}
                                    className="fetched-img"
                                    src={image} // Use the fetched image URL
                                    alt={`Playlist ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    // Loading Placeholder
                    <div className="loading-container">
                        <div className="loading-spinner">
                            {/* Add spinner or loading animation here if needed */}

                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Selection;
