import React, { useState, useEffect } from 'react';
import NavBarLoggedIn from "../../components/NavBarLoggedIn/NavBarLoggedIn";
import ProfileWrapped from "../../components/ProfileWrapped/ProfileWrapped";
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
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
                    headers: { Authorization: `Token ${token}` }
                });
                const { username, email, top_artist, wraps } = response.data;
                setUsername(username);
                setEmail(email);
                setTaste(top_artist || 'No artist data');
                setWrappedData(wraps || []);
            } catch (error) {
                setError('Failed to load profile data.');
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
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

    // Framer Motion animation variants
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <>
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
                            src="https://via.placeholder.com/300"
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
                            <ProfileWrapped />
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
