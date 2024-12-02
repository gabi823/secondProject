import React, {useEffect, useState} from 'react';
import NavBarLoggedIn from "../../components/NavBarLoggedIn/NavBarLoggedIn";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import "./Settings.css";
import {Grid} from "@mui/material";

const Settings = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [spotifyUsername, setSpotifyUsername] = useState(null);

    useEffect(() => {
    const fetchSpotifyInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/get_spotify_info/', {
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

    const handleUnlinkSpotify = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/unlink_spotify/', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            alert('Spotify account unlinked successfully!');
            setSpotifyUsername(null); // Reset the displayed Spotify username
        } else {
            const data = await response.json();
            alert(`Failed to unlink Spotify: ${data.error || response.statusText}`);
        }
    } catch (error) {
        console.error('Error unlinking Spotify account:', error);
        alert('Failed to unlink Spotify account. Please try again.');
    }
};

const handleLinkSpotify = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/spotify/login/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            if (data.auth_url) {
                window.location.href = data.auth_url; // Redirect to Spotify login
            } else {
                alert('Failed to retrieve Spotify login URL.');
            }
        } else {
            const errorData = await response.json();
            alert(`Error initiating Spotify login: ${errorData.error || response.statusText}`);
        }
    } catch (error) {
        console.error('Error initiating Spotify login:', error);
        alert('Failed to initiate Spotify login. Please try again.');
    }
};


    const handleLogout = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            await fetch('http://localhost:8000/api/logout/', {
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

            const url = 'http://localhost:8000/api/delete_account/';
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

        const response = await fetch('http://localhost:8000/api/change_password/', {
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
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <NavBarLoggedIn />
                </Grid>

            {/* Left section with Settings title and Back button */}
                 <Grid item xs={12}>
            <div className="settings-container">
                <Grid container spacing={0}>
                    {/*<div className="settings-left-section">*/}
                        <Grid item xs={12}>
                            <h1 className="settings-title">Settings</h1>
                        </Grid>
                        <Grid item xs={12}>
                              <Link to="/profile" className="settings-back-link">
                            <span className="back-arrow">←</span>
                            back to profile
                        </Link>
                        </Grid>
                    {/*</div>*/}
                </Grid>


                {/* Settings items container */}
                <div className="settings-items-container">
                    {/* Spotify Account Section */}
                    <div className="settings-section">
                        <h2>Spotify Account</h2>
                        <p>The Spotify account you’re signed in with.</p>
                        <div className="settings-info-container">
                            {spotifyUsername ? (
                                <>
                                    <span className="settings-username">{spotifyUsername}</span>
                                    <button className="change-button" onClick={handleUnlinkSpotify}>
                                        UNLINK
                                    </button>
                                </>
                            ) : (
                                <button className="change-button" onClick={handleLinkSpotify}>
                                    LINK SPOTIFY
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="password-section">
                        <div className="settings-section">
                            <h2>Password</h2>
                            <p>Change your nostalgify account password.</p>
                            <button className="password-button" onClick={handleChangePassword}>CHANGE</button>
                        </div>
                    </div>

                    {/* Log Out and Delete Account Sections */}
                    <div className="settings-row">
                        <div className="settings-section">
                            <h2>Log Out</h2>
                            <p>Log out of your account in this browser.</p>
                            <button className="logout-button" onClick={handleLogout}
                                    disable={isLoading}>{isLoading ? 'LOGGING OUT...' : 'LOG OUT'}</button>
                        </div>
                        <div className="settings-section">
                            <h2>Delete Account</h2>
                            <p>Delete your nostalgify account and its data.</p>
                            <button className="delete-button" onClick={handleDeleteAccount}
                                    disabled={isDeleting}>{isDeleting ? 'DELETING...' : 'DELETE ACCOUNT'}</button>
                        </div>
                    </div>
                </div>
            </div>
                 </Grid>
            </Grid>
        </>
    );
};
export default Settings;