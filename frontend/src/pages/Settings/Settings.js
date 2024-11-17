import React from 'react';
import NavBarLoggedIn from "../../components/NavBarLoggedIn/NavBarLoggedIn";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import "./Settings.css";

const Settings = () => {
    // Animation Variants
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
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

                    {/* Email and Password Sections */}
                    <motion.div className="settings-row" variants={fadeUpVariants}>
                        <div className="settings-section">
                            <h2>Email</h2>
                            <p>The email associated with your account.</p>
                            <div className="email-info-container">
                                <p className="settings-username"><b>youremail@email.com</b></p>
                                <button className="change-button">CHANGE</button>
                            </div>
                        </div>
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
                            <button className="logout-button">LOG OUT</button>
                        </div>
                        <div className="settings-section">
                            <h2>Delete Account</h2>
                            <p>Delete your nostalgify account and its data.</p>
                            <button className="delete-button">DELETE ACCOUNT</button>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </>
    );
};

export default Settings;
