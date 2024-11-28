import React, {useState} from 'react';
import NavBarLoggedIn from "../../components/NavBarLoggedIn/NavBarLoggedIn";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import "./Settings.css";

const Settings = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

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
                throw new Error('No authentication token found');
            }

            const response = await fetch('https://secondproject-8lyv.onrender.com/api/delete_account/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                mode: 'cors'  // Add this line explicitly
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Delete failed:', errorText);
                throw new Error(`Delete failed: ${response.status}`);
            }

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
                        <div className="settings-info-container">
                            <span className="settings-username">your_username</span>
                            <button className="change-button">CHANGE</button>
                        </div>
                    </motion.div>


                    <motion.div className="password-section" variants={fadeUpVariants}>
                        <div className="settings-section">
                            <h2>Password</h2>
                            <p>Change your nostalgify account password.</p>
                            <button className="password-button">CHANGE</button>
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
