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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/fetch-playlist-images/');
                const images = response.data.images;

                const topImages = images.slice(0, 10);
                const bottomImages = images.slice(10, 20);

                setTopRowImages([...topImages, ...topImages]); // Duplicate for continuous scrolling
                setBottomRowImages([...bottomImages, ...bottomImages]);
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
            const response = await axios.post('/api/login/', { username, password });
            const token = response.data.token;

            localStorage.setItem('token', token);
            navigate('/profile');
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    // Framer Motion animation settings
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const fadeDownVariants = {
        hidden: { opacity: 0, y: 0 },
        visible: { opacity: 1, y: 8, transition: { duration: 0.5 } },
    };

    return (
        <>
            <NavBar />
            <motion.div
                initial="hidden"
                animate="visible"
                className="images-container"
            >
                {fetchError && <p className="fetch-error">{fetchError}</p>}
                <div className="images-row images-row-top">
                    {topRowImages.map((src, index) => (
                        <motion.img
                            key={index}
                            className="carousel-image-top"
                            src={src}
                            alt={`Top image ${index + 1}`}
                            initial="hidden"
                            animate="visible"
                            variants={fadeDownVariants}
                        />
                    ))}
                </div>
                <div className="images-row images-row-bottom">
                    {bottomRowImages.map((src, index) => (
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
            </motion.div>

            <motion.div
                className="login-container"
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
            >
                <div className="login-box">
                    <div className="login-title" variants={fadeUpVariants}>
                        Login
                    </div>
                    <form onSubmit={handleSubmit} className="login-form">
                        <label className="login-label" variants={fadeUpVariants}>
                            Username:
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="login-input"
                            variants={fadeUpVariants}
                            required
                        />
                        <label className="login-label" variants={fadeUpVariants}>
                            Password:
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                            variants={fadeUpVariants}
                            required
                        />
                        <div className="login-button-container" variants={fadeUpVariants}>
                            <button
                                type="submit"
                                className="login-button"
                            >
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
