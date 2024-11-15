import React, { useState, useEffect } from 'react';
import NavBarLoggedIn from "../../components/NavBarLoggedIn/NavBarLoggedIn";
import { Link, useNavigate } from "react-router-dom";
import "./Settings.css";
import axios from 'axios';

const Settings = () => {
    const [spotifyUsername, setSpotifyUsername] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/profile/', {
                headers: { Authorization: `Token ${token}` }
            });
            setEmail(response.data.email);
            setSpotifyUsername(response.data.spotify_username || 'Not connected');
        } catch (error) {
            setMessage('Failed to load user data');
        }
    }

    const handleSpotifyChange = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('/unlink/spotify/', {}, {
                headers: { Authorization: `Token ${token}` }
            });
            window.location.href = '/spotify/login/';
        } catch (error) {
            setMessage('Failed to change Spotify account');
        }
    };

    const handleEmailChange = async (newEmail) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('/api/update-email/',
                { email: newEmail },
                {headers: { Authorization: `Token ${token}` }},
            );
            setEmail(newEmail);
            setMessage('Email updated successfully!');
        } catch (error) {
            setMessage('Failed to update email.');
        }
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/logout/', {}, {
                headers: { Authorization: `Token ${token}` }
            });
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            setMessage('Logout failed');
        }
    }

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                const token = localStorage.getItem('token');
                await axios.post('/delete_account/', {}, {
                    headers: { Authorization: `Token ${token}` }
                });
                localStorage.removeItem('token');
                navigate('/login');
            } catch (error) {
                setMessage('Failed to delete account');
            }
        }
    }

    return (
        <>
            <NavBarLoggedIn />
            <div className="settings-container">
                {/* Left section with Settings title and Back button */}
                <div className="settings-left-section">
                    <h1 className="settings-title">Settings</h1>
                    <Link to="/profile" className="settings-back-link">
                        <span className="back-arrow">←</span>
                        back to profile
                    </Link>
                </div>

                {/* Settings items container */}
                <div className="settings-items-container">
                    {/* Spotify Account Section */}
                    <div className="settings-section">
                        <h2>Spotify Account</h2>
                        <p>The Spotify account you’re signed in with.</p>
                        <div className="settings-info-container">
                            <span className="settings-username">{spotifyUsername}</span>
                            <button className="change-button">CHANGE</button>
                        </div>
                    </div>

                    {/* Email Section */}
                    <div className="settings-section">
                        <h2>Email</h2>
                        <p>The email associated with your account.</p>
                        <div className="settings-info-container">
                            <span className="settings-username">{email}</span>
                            <button
                                className="change-button"
                                onClick={() => {
                                    const newEmail = prompt('Enter new email:');
                                    if (newEmail) handleEmailChange(newEmail);
                                }}
                            >
                                CHANGE
                            </button>
                        </div>
                    </div>

                    {/* Row for Log Out and Delete Account Sections */}
                    <div className="settings-row">
                        {/* Log Out Section */}
                        <div className="settings-section">
                            <h2>Log Out</h2>
                            <p>Log out of your account in this browser.</p>
                            <button
                                className="logout-button"
                                onClick={handleLogout}
                            >
                                LOG OUT
                            </button>
                        </div>

                        {/* Delete Account Section */}
                        <div className="settings-section">
                            <h2>Delete Account</h2>
                            <p>Delete your nostalgify account and its data.</p>
                            <button
                                className="delete-button"
                                onClick={handleDeleteAccount}
                            >
                                DELETE ACCOUNT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
