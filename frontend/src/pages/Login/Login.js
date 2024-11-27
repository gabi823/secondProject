import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [topRowImages, setTopRowImages] = useState([]);
    const [bottomRowImages, setBottomRowImages] = useState([]);
    const [fetchError, setFetchError] = useState('');
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('https://nostalgify-backend.azurewebsites.net/api/fetch-playlist-images/');
                const images = response.data.images;

                const topImages = images.slice(0, 10);
                const bottomImages = images.slice(10, 20);

                // Duplicate the images to create a seamless loop
                setTopRowImages([...topImages, ...topImages]);
                setBottomRowImages([...bottomImages, ...bottomImages]);
                setImagesLoaded(true); // Mark images as loaded
            } catch (error) {
                console.error('Error fetching images:', error);
                setFetchError('Failed to fetch images.');
            }
        };

        fetchImages();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://nostalgify-backend.azurewebsites.net/api/login/', { username, password });
            const token = response.data.token;

            localStorage.setItem('token', token);
            navigate('/profile');
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please check your credentials.');
        }
    };

    // Framer Motion animation settings
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <>
            <NavBar/>
            <motion.div
                className="images-container"
                initial="hidden" // Fixed typo
                animate="visible" // Corrected spelling
                variants={fadeUpVariants}
            >
                {fetchError && <p className="fetch-error">{fetchError}</p>}
                {imagesLoaded ? (
                    <>
                        <div className="images-row images-row-top">
                            {topRowImages.map((src, index) => (
                                <motion.img
                                    key={index}
                                    className="carousel-image"
                                    src={src}
                                    alt={`Top image ${index + 1}`}
                                    initial="hidden"
                                    animate="visible"
                                    variants={fadeUpVariants}
                                />
                            ))}
                        </div>
                        <div className="images-row images-row-bottom">
                            {bottomRowImages
                                .slice()
                                .reverse()
                                .map((src, index) => (
                                    <motion.img
                                        key={index}
                                        className="carousel-image"
                                        src={src}
                                        alt={`Bottom image ${index + 1}`}
                                        initial="hidden"
                                        animate="visible"
                                        variants={fadeUpVariants}
                                    />
                                ))}
                        </div>
                    </>
                ) : (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                    </div>
                )}
            </motion.div>


            <motion.div
                className="login-container"
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
            >
                <div className="login-box">
                    <div className="login-title">
                        Login
                    </div>
                    <form onSubmit={handleSubmit} className="login-form">
                        <label className="login-label">Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="login-input"
                            required
                        />
                        <label className="login-label">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                            required
                        />
                        <div className="login-button-container">
                            <button type="submit" className="login-button">
                                Login
                            </button>
                        </div>
                    </form>
                    {error && <p className="login-error">{error}</p>}
                </div>
            </motion.div>
        </>
    );
};

export default Login;
