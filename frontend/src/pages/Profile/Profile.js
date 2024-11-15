import React, { useState, useEffect } from 'react';
import NavBarLoggedIn from "../../components/NavBarLoggedIn/NavBarLoggedIn";
import ProfileWrapped from "../../components/ProfileWrapped/ProfileWrapped";
import { Link, useNavigate } from "react-router-dom";
import './Profile.css';
import axios from 'axios';

const Profile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [wrappedData, setWrappedData] = useState([]);

    useEffect(() => {
        fetchUserData();
        fetchWrappedData();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/profile/', {
                headers: { Authorization: `Token ${token}` }
            });
            setUsername(response.data.username);
            setEmail(response.data.email);
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    const fetchWrappedData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/spotify/data', {
                headers: { Authorization: `Token ${token}` }
            });

            // Get user's wraps if they exist
            if (response.data.wraps) {
                setWrappedData(response.data.wraps);
            }
        } catch (error) {
            console.error('Failed to fetch wrapped data:', error);
        }
    };

    const deleteWrap = async (wrapId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/spotify/delete_wrap/${wrapId}/`, {
                headers: { Authorization: `Token ${token}` }
            });
            setWrappedData(wrappedData.filter(wrap => wrap.id !== wrapId));
        } catch (error) {
            console.error('Failed to delete wrap.');
        }
    };

    return (
        <>
            <NavBarLoggedIn />
            <div className="profile-container">
                {/* Profile Container */}
                <div className="profile-section">
                    <div className="profile-image-container">
                        <img
                            src="https://via.placeholder.com/300" // Replace with your image source
                            alt="Profile"
                            className="profile-image"
                        />
                    </div>
                    <div className="username">
                        {username}
                    </div>
                    <div className="email">
                        {email}
                    </div>

                    <div className="taste-container">
                        <img
                            src="https://via.placeholder.com/64x64"
                            alt="Artist"
                            className="artist-image"
                        />
                        <div>
                            <div style={{ color: 'black', fontSize: '18px', fontFamily: 'Manrope', fontWeight: '600' }}>
                                Taste
                            </div>
                            <div style={{ color: 'black', fontSize: '14px', fontFamily: 'Manrope', fontWeight: '400' }}>
                                Sabrina Carpenter
                            </div>
                        </div>
                    </div>
                    <Link to="/settings">
                        <div className="settings-link">
                            <div className="settings-text">
                                Settings
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Profile Wrapped Container */}
                <div className="profile-wrapped-container">
                    {wrappedData.length > 0 ? (
                        wrappedData.map((wrap) => (
                            <div key={wrap.id} className="wrapped-section">
                                <img
                                    src="/api/placeholder/160/160"
                                    alt="Wrapped"
                                    className="wrapped-image"
                                />
                                <div className="wrapped-title">
                                    Your Wrapped #{wrap.id}<br/>
                                    <span className="wrapped-date">Date Created: {new Date(wrap.created_at).toLocaleDateString()}</span>
                                </div>
                                <img
                                    src="/api/placeholder/28/28"
                                    alt="delete"
                                    className="icon"
                                    onClick={() => deleteWrap(wrap.id)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'Manrope' }}>
                            No wraps created yet
                        </div>
                    )}


                    <div className="create-new-wrapped">
                        <Link to="/selectionscreen" className="create-new-link">
                            Create New Wrapped
                        </Link>
                        <Link to="/selectionscreen" className="create-new-icon">
                            +
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
