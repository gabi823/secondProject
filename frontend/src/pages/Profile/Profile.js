import React, { useState, useEffect } from 'react';
import NavBarLoggedIn from "../../components/NavBarLoggedIn/NavBarLoggedIn";
import ProfileWrapped from "../../components/ProfileWrapped/ProfileWrapped";
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import './Profile.css';
import axios from 'axios';
import SpotifyLinkModal from '../../components/SpotifyLinkModal/SpotifyLinkModal';

const Profile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [wrappedData, setWrappedData] = useState([]);
    const [profileImage, setProfileImage] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [hasSpotifyLinked, setHasSpotifyLinked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const initializeProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                // Check Spotify link
                console.log('Checking Spotify link...');
                const spotifyResponse = await fetch('https://secondproject-8lyv.onrender.com/api/check-spotify-link/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (spotifyResponse.ok) {
                    const data = await spotifyResponse.json();
                    setShowLinkModal(!data.hasSpotifyLinked);
                    setHasSpotifyLinked(data.hasSpotifyLinked);
                } else {
                    setShowLinkModal(true);
                }

                // Fetch profile data
                console.log('Fetching profile data...');

                const profileResponse = await axios.get('https://secondproject-8lyv.onrender.com/api/profile/', {
                    headers: {
                        Authorization: `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const { username, email, top_artist, profile_image_url } = profileResponse.data;
                setUsername(username);
                setEmail(email);
                setProfileImage(profile_image_url || 'https://via.placeholder.com/300');

                // Fetch Wrapped data
                const wrappedResponse = await axios.get('https://secondproject-8lyv.onrender.com/api/get-wrapped-data/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                setWrappedData(wrappedResponse.data.map(wrap => ({
                    ...wrap,
                    album_cover_url: wrap.album_cover_url || "https://via.placeholder.com/160",
                })));
            } catch (error) {
                console.error('Error initializing profile:', error);
                setError('Failed to load profile and Wrapped data.');
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
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.auth_url) {
                    window.location.href = data.auth_url;
                } else {
                    throw new Error('No auth_url in response');
                }
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error initiating Spotify link:', error);
            alert('Failed to connect to Spotify. Please try again.');
        }
    };

    const createNewWrapped = async (timeRange) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'https://secondproject-8lyv.onrender.com/api/create-wrapped/',
                { time_range: timeRange },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setWrappedData([...wrappedData, response.data]);
            setMessage('Wrapped created successfully!');
        } catch (error) {
            console.error('Error creating Wrapped:', error);
            setError('Failed to create new Wrapped.');
        }
    };

    const deleteWrap = async (wrapId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete('https://secondproject-8lyv.onrender.com/api/spotify/delete_wrap/${wrapId}/', {
                headers: { Authorization: `Token ${token}` },
            });
            setWrappedData(wrappedData.filter(wrap => wrap.id !== wrapId));
            setMessage('Wrap deleted successfully!');
        } catch (error) {
            console.error('Error deleting Wrapped:', error);
            setError('Failed to delete Wrapped.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {showLinkModal && <SpotifyLinkModal onLink={checkSpotifyLink} />}
            <NavBarLoggedIn />
            <motion.div
                className="profile-container"
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
            >
                <motion.div className="profile-section" variants={fadeUpVariants}>
                    <div className="profile-image-container">
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="profile-image"
                        />
                    </div>
                    <div className="username">{username || "Username"}</div>
                    <div className="email">{email || "email@example.com"}</div>
                    <Link to="/settings" className="settings-link">
                        Settings
                    </Link>
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </motion.div>
                <motion.div className="profile-wrapped-container" variants={fadeUpVariants}>
                    {wrappedData.map((wrap) => (
                        <motion.div key={wrap.id} className="wrapped-section" variants={fadeUpVariants}>
                            <img
                                src={wrap.album_cover_url}
                                alt="Wrapped Image"
                                className="wrapped-img"
                            />
                            <div className="wrapped-details">
                                <h4>Your Wrapped #{wrap.id}</h4>
                                <p>Date Created: {new Date(wrap.date_created).toLocaleDateString()}</p>
                                <button onClick={() => deleteWrap(wrap.id)}>×</button>
                            </div>
                        </motion.div>
                    ))}
                    <div className="create-new-wrapped">
                        <Link to="/selectionscreen" className="create-new-link">
                            Create New Wrapped
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};

export default Profile;
