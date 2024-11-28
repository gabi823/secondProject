import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar.js';
import NavBarLoggedIn from "../../components/NavBarLoggedIn/NavBarLoggedIn";
import './Welcome.css';
import axios from 'axios';
import { motion } from 'framer-motion';

const Welcome = () => {
    const [images, setImages] = useState({
        column1: [],
        column2: [],
        column3: []
    });
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // Get the token from localStorage
                const token = localStorage.getItem('token');

                // If there's no token, user is not logged in
                if (!token) {
                    setIsLoggedIn(false);
                    return;
                }

                // Check login status with the token
                const response = await axios.get('http://localhost:8000/api/check-login/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    },
                    withCredentials: true
                });

                if (response.data.isLoggedIn) {
                    setIsLoggedIn(true);
                    setUser(response.data.user);
                } else {
                    setIsLoggedIn(false);
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error("Error checking login status:", error);
                setIsLoggedIn(false);
                localStorage.removeItem('token');
            }
        };

        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/fetch-playlist-images/');
                const fetchedImages = response.data.images;

                const column1Images = fetchedImages.slice(0, 30);
                const column2Images = fetchedImages.slice(30, 70);
                const column3Images = fetchedImages.slice(70, 100);

                setImages({
                    column1: [...column1Images, ...column1Images],
                    column2: [...column2Images, ...column2Images],
                    column3: [...column3Images, ...column3Images],
                });
                setImagesLoaded(true);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        checkAuthStatus();
        fetchImages();
    }, []);

    // Framer Motion animation variants
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };

    return (
        <>
        {isLoggedIn ? <NavBarLoggedIn /> : <NavBar />}
            {imagesLoaded ? (
                <motion.div
                    className="welcome-container"
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpVariants}
                >
                    <div className="image-column-left image-column1">
                        {images.column1.map((src, index) => (
                            <img key={index} src={src} alt={`image${index + 1}`} className="carousel-image1" />
                        ))}
                    </div>
                    <div className="image-column-middle image-column2">
                        {images.column2.map((src, index) => (
                            <img key={index} src={src} alt={`image${index + 1}`} className="carousel-image2" />
                        ))}
                    </div>
                    <div className="image-column-right image-column3">
                        {images.column3.map((src, index) => (
                            <img key={index} src={src} alt={`image${index + 1}`} className="carousel-image3" />
                        ))}
                    </div>
                </motion.div>
            ) : (
                <div className="loading-message">   </div>
            )}
        </>
    );
};

export default Welcome
