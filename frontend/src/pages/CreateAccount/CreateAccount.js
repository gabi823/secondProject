import React, { useState, useEffect } from 'react';
import NavBar from "../../components/NavBar/NavBar";
import './CreateAccount.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [topRowImages, setTopRowImages] = useState([]);
    const [bottomRowImages, setBottomRowImages] = useState([]);
    const [spotifyClientId, setSpotifyClientId] = useState('');
    const [spotifyRedirectUri, setSpotifyRedirectUri] = useState('');
    const [message, setMessage] = useState('');
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [fetchError, setFetchError] = useState('');
    const navigate = useNavigate();

    // Fetch Spotify credentials from backend
    useEffect(() => {
        const fetchSpotifyCredentials = async () => {
            try {
                console.log('Fetching Spotify credentials...');
                const response = await axios.get('http://localhost:8000/api/spotify-credentials/');
                console.log('Received credentials:', response.data);  // Add this
                setSpotifyClientId(response.data.client_id);
                setSpotifyRedirectUri(response.data.redirect_uri);

                // Log the Spotify Redirect URI after setting it
                console.log("Spotify Redirect URI (frontend):", response.data.redirect_uri);
            } catch (error) {
                console.error('Error fetching Spotify credentials:', error);
            }
        };

        fetchSpotifyCredentials();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send POST request to Django API
            const response = await axios.post('http://localhost:8000/api/register/', {
                username,
                password,
                email,
            });
            console.log('Actual spotify_url value:', response.data.spotify_url);
            console.log('Full responseeeeeeeeeee:', response.data);

            localStorage.setItem('token', response.data.token);

            //if (response.data.spotify_url) {
                //console.log('Redirecting to Spotify URL:', response.data.spotify_url);
                //window.location.href = response.data.spotify_url;

            const spotifyUrl = response.data.spotify_url;
            if (spotifyUrl) {
                console.log('Redirecting to:', spotifyUrl);
                window.open(spotifyUrl, '_self')
                setTimeout(() => {
                    window.location.replace(spotifyUrl);
                }, 100);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(Object.values(error.response.data).join(', '));
            } else {
                setMessage('Account creation failed. Please try again.');
            }
        }
    }

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/fetch-playlist-images/');
                const images = response.data.images;

                // Divide images into two rows and duplicate for smooth infinite scrolling
                const topImages = images.slice(0, 10);
                const bottomImages = images.slice(10, 20);

                setTopRowImages([...topImages, ...topImages]);  // Duplicate for continuous scrolling
                setBottomRowImages([...bottomImages, ...bottomImages]);
                setImagesLoaded(true);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

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
                className="create-account-container"
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
            >
                <form className="create-account-form" onSubmit={handleSubmit}>
                    <div className="form-heading">Create Account</div>

                    <div className="form-label">Username:</div>
                    <input
                        type="text"
                        className="form-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <div className="form-label">Password:</div>
                    <input
                        type="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="form-label">Email:</div>
                    <input
                        type="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className="create-button">Create Account</button>

                    {/* Show feedback message */}
                    {message && <p className="form-message">{message}</p>}
                </form>
            </motion.div>
        </>
    );
};

export default CreateAccount;
