import React, { useState, useEffect } from 'react';
import NavBarLoggedIn from "../../components/NavBarLoggedIn/NavBarLoggedIn";
import ProfileWrapped from "../../components/ProfileWrapped/ProfileWrapped";
import { Link, useNavigate } from "react-router-dom";
import './Profile.css';
import axios from 'axios';

const Profile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [taste, setTaste] = useState('');
    const [wrappedData, setWrappedData] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/profile/', {
                    headers: {Authorization: `Token ${token}`}
                });
                const {username, email, top_artist, wraps} = response.data;
                setUsername(username);
                setEmail(email);
                setTaste(top_artist || 'No artist data');
                //setWrapped(wraps || []);
            } catch (error) {
                setError('Failed to load profile data.');
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

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
                    {wrappedData.map((wrap) => (
                        <div key={wrap.id} className="wrapped-section">
                            <img
                                src="https://via.placeholder.com/160x160"
                                alt="Wrapped"
                                className="wrapped-image"
                            />
                            <div className="wrapped-title">
                                {wrap.title}<br/>
                                <span className="wrapped-date">Date Created: {wrap.date_created}</span>
                            </div>
                            <img
                                src="https://via.placeholder.com/28x28"
                                alt="delete-icon"
                                className="icon"
                                onClick={() => deleteWrap(wrap.id)}
                            />
                        </div>
                    ))}
                    <ProfileWrapped/> {/*need some array to loop through user data and make all the profile wrapped*/}


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
