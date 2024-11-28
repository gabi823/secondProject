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
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [hasSpotifyLinked, setHasSpotifyLinked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeProfile = async () => {
            // Check authentication
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login');
                return;
            }

            // Check Spotify link
            try {
                const response = await fetch('http://localhost:8000/api/check-spotify-link/', {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setShowLinkModal(!data.hasSpotifyLinked);
                    setHasSpotifyLinked(data.hasSpotifyLinked);
                } else {
                    setShowLinkModal(true);
                }

                // Fetch profile data
                const profileResponse = await axios.get('http://localhost:8000/api/profile/', {
                    headers: {
                        Authorization: `Token ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                console.log('Profile API Response:', profileResponse.data);

                const {username, email, top_artist, profile_image_url} = profileResponse.data;

                setUsername(username);
                setEmail(email);
                setTaste(top_artist || 'No artist data');
                setProfileImage(profile_image_url || 'https://via.placeholder.com/300');

                console.log('Profile Image URL:', profileImage);
                console.log('Profile Response:', profileResponse.data);

                const wrappedResponse = await axios.get('http://localhost:8000/api/get-wrapped-data/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                console.log('Wrapped Data Response:', wrappedResponse.data);

                setWrappedData(wrappedResponse.data.map(wrap => ({
                    ...wrap,
                    album_cover_url: wrap.album_cover_url || "https://via.placeholder.com/160",
                })));
            } catch (error) {
                console.error('Error initializing profile:', error);
                setError('Failed to load profile and Wrapped data.');
            }
            setIsLoading(false);
        };
        initializeProfile();
    }, [navigate, hasSpotifyLinked]);

    const createNewWrapped = async (timeRange) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:8000/api/create-wrapped/',
                {time_range: timeRange},
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
            setError('Failed to create new wrapped.');
        }
    };

    const deleteWrap = async (wrapId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/spotify/delete_wrap/${wrapId}/`, {
                headers: { Authorization: `Token ${token}` }
            });
            setWrappedData(wrappedData.filter(wrap => wrap.id !== wrapId));
            setMessage('Wrap deleted successfully!');
        } catch (error) {
            setError('Failed to delete wrap.');
        }
    };

    const checkSpotifyLink = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Using token:', token); // Debug log

            const response = await fetch('http://localhost:8000/api/spotify/login/', {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });

            console.log('Response status:', response.status); // Debug log

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Spotify login response:', data); // Debug log

            if (data.auth_url) {
                window.location.href = data.auth_url;
            } else {
                throw new Error('No auth_url in response');
            }
        } catch (error) {
            console.error('Error initiating Spotify link:', error);
            // Show error to user
            alert('Failed to connect to Spotify. Please try again.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Framer Motion animation variants
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    if (isLoading) {
        return <div>   </div>;
    }

    return (
        <>
            {showLinkModal && (
                <SpotifyLinkModal onLink={checkSpotifyLink} />
            )}
            <NavBarLoggedIn />
            <motion.div
                className="profile-container"
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
            >
                {/* Profile Section */}
                <motion.div
                    className="profile-section"
                    variants={fadeUpVariants}
                >
                    <div className="profile-image-container">
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="profile-image"
                        />
                    </div>

                    <div className="username">{username || "Username"}</div>
                    <div className="email">{email || "email@1234.com"}</div>

                    <Link to="/settings">
                        <div className="settings-link">
                            <div className="settings-text">Settings</div>
                        </div>
                    </Link>
                </motion.div>

                {/* Profile Wrapped Section */}
                <motion.div
                    className="profile-wrapped-container"
                    variants={fadeUpVariants}
                >
                    {wrappedData.map((wrap) => (
                        <motion.div
                            key={wrap.id}
                            className="wrapped-section"
                            variants={fadeUpVariants}
                        >
                            <img
                                src={wrap.album_cover_url || "https://via.placeholder.com/160"}
                                alt="Wrapped Image"
                                className="wrapped-img"
                            />
                            <div className="wrapped-details">
                                <h4>Your Wrapped #{wrap.id}</h4>
                                <p>Date Created: {new Date(wrap.date_created).toLocaleDateString()}</p>
                                <button onClick={() => deleteWrap(wrap.id)}>×</button>
                            </div>
                            <ProfileWrapped/>
                        </motion.div>
                    ))}
                    <ProfileWrapped />

                    <div className="create-new-wrapped">
                        <Link to="/selectionscreen" className="create-new-link">
                            Create New Wrapped
                        </Link>
                        <Link to="/selectionscreen" className="create-new-icon">
                            +
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};

export default Profile;
