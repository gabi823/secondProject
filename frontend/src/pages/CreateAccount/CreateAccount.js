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
    const [spotifyClientId, setSpotifyClientId] = useState('');
    const [spotifyRedirectUri, setSpotifyRedirectUri] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Fetch Spotify credentials from backend
    useEffect(() => {
        const fetchSpotifyCredentials = async () => {
            try {
                console.log('Fetching Spotify credentials...');
                const response = await axios.get('https://secondproject-8lyv.onrender.com/api/spotify-credentials/');
                console.log("Response code:", response.status);
                console.log('Received credentials:', response.data); // Log received data
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
            const response = await axios.post('https://secondproject-8lyv.onrender.com/api/register/', {
                username,
                password,
                email,
            });

            console.log('Registration response:', response.data);

            localStorage.setItem('token', response.data.token);

            navigate('/profile');
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(Object.values(error.response.data).join(', '));
            } else {
                setMessage('Account creation failed. Please try again.');
            }
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
