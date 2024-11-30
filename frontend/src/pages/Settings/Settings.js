import React, {useEffect, useState} from 'react';
import NavBarLoggedIn from "../../components/NavBarLoggedIn/NavBarLoggedIn";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import "./Settings.css";

const Settings = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [spotifyUsername, setSpotifyUsername] = useState(null);

    useEffect(() => {
    const fetchSpotifyInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://secondproject-8lyv.onrender.com/api/get_spotify_info/', {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setSpotifyUsername(data.spotify_username);
            } else {
                setSpotifyUsername(null);
            }
        } catch (error) {
            console.error('Error fetching Spotify info:', error);
        }
    };

    fetchSpotifyInfo();
}, []);

    // Animation Variants
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            await fetch('https://secondproject-8lyv.onrender.com/api/logout/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`
                }
            });

            // Clear local storage and redirect
            localStorage.removeItem('token');
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed:', error);
            setIsLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        setIsDeleting(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No authentication token found');
                alert('No token found. Please log in again.');
                return;
            }
            console.log('Token:', token); // Debug: Log the token

            const url = 'https://secondproject-8lyv.onrender.com/api/delete_account/';
            console.log('Request URL:', url); // Debug: Log the request URL

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Ensure cookies/credentials are included
                mode: 'cors',
            });

            console.log('Response status:', response.status); // Debug: Log response status
            const responseData = await response.json();
            console.log('Response data:', responseData); // Debug: Log response body

            if (!response.ok) {
                console.error('Delete failed:', responseData);
                throw new Error(`Delete failed: ${response.status}`);
            }

            // Success: Clear local storage and redirect
            localStorage.removeItem('token');
            window.location.href = '/';
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('Failed to delete account. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    }
};

    const handleChangePassword = async () => {
    const oldPassword = prompt("Enter your current password:");
    const newPassword = prompt("Enter your new password:");
    const confirmPassword = prompt("Confirm your new password:");

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No token found. Please log in again.');
            return;
        }

        const response = await fetch('https://secondproject-8lyv.onrender.com/api/change_password/', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                old_password: oldPassword,
                new_password: newPassword,
            }),
        });

        if (response.ok) {
            alert("Password changed successfully!");
        } else {
            const data = await response.json();
            alert(`Password change failed: ${data.error || response.statusText}`);
        }
    } catch (error) {
        console.error("Error changing password:", error);
        alert("Failed to change password. Please try again.");
    }
};




    return (
        <>
            <NavBarLoggedIn />
            <motion.div
                className="settings-container"
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
            >
                {/* Left section with Settings title and Back button */}
                <motion.div className="settings-left-section" variants={fadeUpVariants}>
                    <h1 className="settings-title">Settings</h1>
                    <Link to="/profile" className="settings-back-link">
                        <span className="back-arrow">←</span>
                        back to profile
                    </Link>
                </motion.div>

                {/* Settings items container */}
                <motion.div className="settings-items-container" variants={fadeUpVariants}>
                    {/* Spotify Account Section */}
                    <motion.div className="settings-section" variants={fadeUpVariants}>
                        <h2>Spotify Account</h2>
                        <p>The Spotify account you’re signed in with.</p>
                        {spotifyUsername ? (
        <>
            <p>{spotifyUsername}</p>
            <button
                className="unlink-button"
                onClick={async () => {
                    try {
                        const token = localStorage.getItem('token');
                        const response = await fetch('https://secondproject-8lyv.onrender.com/api/unlink_spotify/', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Token ${token}`,
                            },
                        });

                        if (response.ok) {
                            alert('Spotify account unlinked successfully!');
                            setSpotifyUsername(null);
                        } else {
                            alert('Failed to unlink Spotify account.');
                        }
                    } catch (error) {
                        console.error('Error unlinking Spotify:', error);
                    }
                }}
            >
                UNLINK
            </button>
        </>
    ) : (
        <p>No Spotify account linked. <Link to="/spotify-login">Link Spotify</Link></p>
    )}
                    </motion.div>


                    <motion.div className="password-section" variants={fadeUpVariants}>
                        <div className="settings-section">
                            <h2>Password</h2>
                            <p>Change your nostalgify account password.</p>
                            <button className="password-button" onClick={handleChangePassword}>CHANGE</button>
                        </div>
                    </motion.div>

                    {/* Log Out and Delete Account Sections */}
                    <motion.div className="settings-row" variants={fadeUpVariants}>
                        <div className="settings-section">
                            <h2>Log Out</h2>
                            <p>Log out of your account in this browser.</p>
                            <button className="logout-button" onClick={handleLogout} disable={isLoading}>{isLoading ? 'LOGGING OUT...' : 'LOG OUT'}</button>
                        </div>
                        <div className="settings-section">
                            <h2>Delete Account</h2>
                            <p>Delete your nostalgify account and its data.</p>
                            <button className="delete-button" onClick={handleDeleteAccount} disabled={isDeleting}>{isDeleting ? 'DELETING...' : 'DELETE ACCOUNT'}</button>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </>
    );
};

export default Settings;
