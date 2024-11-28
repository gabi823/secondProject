import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import './WrappedPersonality.css';
import { listeningPersonalities } from './listeningPersonalities';
import axios from 'axios';
import SpotifyLinkModal from '../../../components/SpotifyLinkModal/SpotifyLinkModal';

const WrappedPersonality = () => {
    const navigate = useNavigate();
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [hasSpotifyLinked, setHasSpotifyLinked] = useState(false);
    const [error, setError] = useState('');
    const [personalityIndex, setPersonalityIndex] = useState(null); // Initially null to indicate loading
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeProfile = async () => {
            console.log("Initializing profile...");
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/api/listening-personality/', {
                    headers: {
                        Authorization: `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const { listening_personality } = response.data;

                if (listening_personality === "-2") {
                    setShowLinkModal(true);
                } else {
                    setPersonalityIndex(parseInt(listening_personality));
                    console.log("Listening Personality Index:", listening_personality);
                }
            } catch (error) {
                console.error('Error fetching listening personality:', error);
                setError('Failed to load listening personality.');
            } finally {
                setIsLoading(false);
            }
        };

        initializeProfile();
    }, [navigate]);

    const checkSpotifyLink = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/spotify/login/', {
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

    // Conditional rendering: show loading, error, or the component
    if (isLoading) {
        return <div className="loading">Loading your listening personality...</div>;
    }

    if (error || personalityIndex === null) {
        return <div className="error">{error || "An unexpected error occurred."}</div>;
    }

    const { name, color, description } = listeningPersonalities[personalityIndex];

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
                <motion.div className="personality-container"
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
        </>
    );
};

export default WrappedPersonality;
