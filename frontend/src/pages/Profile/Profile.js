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

    const timeRangeMapping = {
        short_term: "Short Term",
        medium_term: "Medium Term",
        long_term: "Long Term",
    };

    const formatTimeRange = (timeRange) => {
        if (!timeRange) return '';
        return timeRange
            .split('_') // Split the string by underscores
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(' '); // Join the words with a space
    };



    useEffect(() => {
        const initializeProfile = async () => {
            // Check authentication
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
                //setTaste(top_artist || 'No artist data');
                setProfileImage(profile_image_url || 'https://via.placeholder.com/300');

                console.log('Profile Image URL:', profileImage);
                console.log('Profile Response:', profileResponse.data);

                // Fetch Wrapped data
                const wrappedResponse = await axios.get('https://secondproject-8lyv.onrender.com0/api/get-wrapped-data/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

                console.log('Wrapped Data Response:', wrappedResponse.data);
                console.log('Wrapped Name:', wrap.wrapped_name);

                setWrappedData(wrappedResponse.data.map(wrap => ({
                    ...wrap,
                    wrapped_name: wrap.wrapped_name || `Your Wrapped #${wrap.id}`,
                    formatted_time_range: formatTimeRange(wrap.time_range),
                    album_cover_url: wrap.album_cover_url || "https://via.placeholder.com/160",
                })));


            } catch (error) {
                console.error('Error initializing profile:', error);
                setError('Failed to load profile and Wrapped data.');
            }
            setIsLoading(false);
        };

        const fetchWraps = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://secondproject-8lyv.onrender.com/api/get-wrapped-data/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                });
                setWrappedData(response.data);
            } catch (error) {
                console.error('Error fetching wraps:', error);
            }
        };
        fetchWraps();
        getCsrfToken();
        initializeProfile();
    }, [navigate, hasSpotifyLinked]);

	const getCsrfToken = async () => {
        const response = await fetch('https://secondproject-8lyv.onrender.com/csrf/');
        const data = await response.json();
        document.cookie = `csrftoken=${data.csrfToken}; path=/`;
    }

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
                'http://localhost:8000/api/create-wrapped/',
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

	const deleteWrap = async (id) => {
        try {
            const csrfToken = document.cookie
                .split("; ")
                .find((row) => row.startsWith("csrftoken="))
                ?.split("=")[1]; // Extract CSRF token from cookies

            console.log("CSRF Token:", csrfToken);

            if (!csrfToken) {
                console.error("CSRF token is missing. Ensure the /csrf/ endpoint is working and the cookie is set.");
                alert("Unable to proceed. Please refresh the page and try again.");
                return;
            }

            const token = localStorage.getItem('token');
            console.log("Using token:", token);

            console.log("Deleting wrap with ID:", id);
            const response = await axios.delete(`https://secondproject-8lyv.onrender.com/api/delete-wrapped/${id}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                    "X-CSRFToken": csrfToken, // Include CSRF token
                },
                withCredentials: true,
            });
            console.log("Delete response:", response.data);

            setWrappedData((prevData) => prevData.filter((wrap) => wrap.id !== id));
            setMessage('Wrap deleted successfully!');
        } catch (error) {
            console.error("Error deleting wrap:", error.response?.data || error.message);
            alert("Failed to delete wrap. Please try again.");
        }
    };

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    if (isLoading) {
        return <div>    </div>;
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
                </motion.div>
                <motion.div className="profile-wrapped-container" variants={fadeUpVariants}>
                    {wrappedData.map((wrap) => (
                        <motion.div
                            key={wrap.id}
                            className="wrapped-section"
                            variants={fadeUpVariants}
                            style={{ cursor: 'pointer' }}  // Add cursor pointer to indicate clickable
                        >
                            {/* Make the whole section (except delete button) clickable */}
                            <div
                                onClick={() => navigate('/wrapped-intro', {
                                  state: {
                                    wrappedConfig: {
                                      name: wrap.wrapped_name,
                                      timePeriod: wrap.time_range,
                                      wrappedId: wrap.id
                                    }
                                  }
                                })}
                                style={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}
                            >
                                <img
                                    src={wrap.album_cover_url}
                                    alt="Wrapped Image"
                                    className="wrapped-img"
                                />
                                <div className="wrapped-details">
                                    <h4>
                                        {wrap.wrapped_name || `Your Wrapped #${wrap.id}`}
                                        {wrap.time_range ? ` (${wrap.time_range})` : ''}
                                    </h4>
                                    <p>Date Created: {new Date(wrap.date_created).toLocaleDateString()}</p>
                                </div>
                            </div>
                            {/* Keep delete button separate from clickable area */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();  // Prevent navigation when clicking delete
                                    deleteWrap(wrap.id);
                                }}
                                className="delete-button"
                            >
                                ×
                            </button>
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
