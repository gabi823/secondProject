import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import './WrappedPersonality.css';
import { listeningPersonalities } from './listeningPersonalities';
import DarkModeToggle from '../../../components/DarkModeToggle/DarkModeToggle';
console.log("Imported listening personalities:", listeningPersonalities);
import axios from 'axios';
import SpotifyLinkModal from '../../../components/SpotifyLinkModal/SpotifyLinkModal';


const WrappedPersonality = () => {
    const navigate = useNavigate();
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [hasSpotifyLinked, setHasSpotifyLinked] = useState(false);
    const [error, setError] = useState('');
    const [personalityIndex, setPersonalityIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Debug log the imported data
    console.log("Imported listening personalities:", listeningPersonalities);

    useEffect(() => {
        const initializeProfile = async () => {
            console.log("Initializing profile...");
            const token = localStorage.getItem('token');

            if (!token) {
                console.log("No token found, redirecting to login");
                navigate('/login');
                return;
            }

            console.log("Token found:", token);

            try {
                console.log("Making request to listening-personality endpoint...");
                const response = await axios.get('https://secondproject-8lyv.onrender.com/api/listening-personality/', {
                    headers: {
                        Authorization: `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                    validateStatus: function(status) {
                        return status < 500; // Don't reject responses with status < 500
                    }
                });

                console.log("Response from server:", {
                    status: response.status,
                    data: response.data,
                    headers: response.headers
                });

                if (response.status === 401) {
                    console.log("Unauthorized - redirecting to login");
                    navigate('/login');
                    return;
                }

                if (response.status !== 200) {
                    throw new Error(response.data.error || 'Failed to fetch listening personality');
                }

                const { listening_personality, personality_code } = response.data;
                console.log("Personality data:", { listening_personality, personality_code });

                if (listening_personality === -2) {
                    console.log("No Spotify account linked, showing modal");
                    setShowLinkModal(true);
                } else {
                    const index = parseInt(listening_personality);
                    console.log("Parsed personality index:", index);

                    if (isNaN(index) || index < 0 || index >= listeningPersonalities.length) {
                        throw new Error(`Invalid personality index: ${index}`);
                    }

                    console.log("Setting personality index to:", index);
                    console.log("Corresponding personality:", listeningPersonalities[index]);
                    setPersonalityIndex(index);
                }
            } catch (error) {
                console.error('Error details:', {
                    message: error.message,
                    response: error.response,
                    status: error.response?.status,
                    data: error.response?.data
                });
                setError('Failed to load listening personality: ' +
                        (error.response?.data?.error || error.message));
            } finally {
                setIsLoading(false);
            }
        };

        initializeProfile();
    }, [navigate]);

    const checkSpotifyLink = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://secondproject-8lyv.onrender.com/api/spotify/login/', {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.auth_url) {
                window.location.href = data.auth_url;
            } else {
                throw new Error('No auth_url in response');
            }
        } catch (error) {
            console.error('Error initiating Spotify link:', error);
            alert('Failed to connect to Spotify. Please try again.');
        }
    };

    if (isLoading) {
        return <div className="personality-loading">Now with all the basics out of the way, let's anaylyze you and your music!</div>;
    }

    if (error || personalityIndex === null) {
        return <div className="error">{error || "An unexpected error occurred."}</div>;
    }

    // Verify personality data before destructuring
    if (!listeningPersonalities || !listeningPersonalities[personalityIndex]) {
        console.error("Invalid personality index or missing data:", {
            index: personalityIndex,
            personalities: listeningPersonalities
        });
        return <div className="error">Unable to determine listening personality.</div>;
    }

    if (!listeningPersonalities) {
        console.error("listeningPersonalities is undefined");
        return <div className="error">Configuration error: Personality types not found.</div>;
    }

    if (!Array.isArray(listeningPersonalities)) {
        console.error("listeningPersonalities is not an array:", listeningPersonalities);
        return <div className="error">Configuration error: Invalid personality types format.</div>;
    }

    const personalityData = listeningPersonalities[personalityIndex];
    console.log("Selected personality data:", personalityData);

    if (!personalityData.name || !personalityData.color || !personalityData.description) {
        console.error("Missing required personality properties:", personalityData);
        return <div className="error">Invalid personality data structure.</div>;
    }

    const { name, color, description } = personalityData;

    const spinAnimation = {
        animate: { rotate: 360 },
        transition: { duration: 8, repeat: Infinity, ease: "linear" },
    };

    const spinReverseAnimation = {
        animate: { rotate: -360 },
        transition: { duration: 6, repeat: Infinity, ease: "linear" },
    };

    const containerVariants = {
        hidden: {
            scale: 0,
            opacity: 0,
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <>
            {showLinkModal && (
                <SpotifyLinkModal onLink={checkSpotifyLink} />
            )}
            <div className="header-container">
                <h1 className="header-title">Your Listening Personality</h1>
                <Link
                    to="/profile"
                    className="exit-link"
                    onClick={() => console.log("Exit clicked")}
                >
                    &times;
                </Link>
            </div>
            <div className='whole-container'>
                <motion.div
                    className="personality-container"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="outer-circle"
                        style={{ transformOrigin: "center" }}
                        {...spinAnimation}
                    ></motion.div>
                    <motion.div
                        className="middle-circle"
                        style={{ transformOrigin: "center" }}
                        {...spinReverseAnimation}
                    ></motion.div>
                    <motion.div
                        className="inner-circle"
                        style={{ transformOrigin: "center" }}
                        {...spinAnimation}
                    ></motion.div>
                    <motion.div
                        className="dotted-circle"
                        style={{ transformOrigin: "center" }}
                        {...spinReverseAnimation}
                    ></motion.div>
                    <div
                        className="core-circle"
                        style={{ backgroundColor: color }}
                    ></div>
                    <div className="personality-name">{name}</div>
                    <div className="personality-description">{description}</div>
                </motion.div>
            </div>

            <Link
                to="/your-playlist"
                className="next-button"
                onClick={() => console.log("Next page clicked")}
            >
                &#8594;
            </Link>
            <DarkModeToggle />
        </>
    );
};

export default WrappedPersonality;