import React from 'react';
import NavBarLoggedIn from "../../components/NavBarLoggedIn/NavBarLoggedIn";
import { Link } from "react-router-dom";
import "./Settings.css";

const Settings = () => {
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
                            <span className="settings-username">your_username</span>
                            <button className="change-button">CHANGE</button>
                        </div>
                    </div>

                    {/* Email Section */}
                    <div className="settings-row">
                        {/* Email Section */}
                        <div className="settings-section">
                            <h2>Email</h2>
                            <p>The email associated with your account.</p>
                            <div className="email-info-container">
                                <p className="settings-username"><b>youremail@email.com</b></p>
                                <button className="change-button">CHANGE</button>
                            </div>
                        </div>

                        {/* CHANGE PASSWORD Section */}
                        <div className="settings-section">
                            <h2>Password</h2>
                            <p>Change your nostalgify account password.</p>
                            <button className="password-button">CHANGE</button>
                        </div>
                    </div>

                    {/* Row for Log Out and Delete Account Sections */}
                    <div className="settings-row">
                        {/* Log Out Section */}
                        <div className="settings-section">
                            <h2>Log Out</h2>
                            <p>Log out of your account in this browser.</p>
                            <button className="logout-button">LOG OUT</button>
                        </div>

                        {/* Delete Account Section */}
                        <div className="settings-section">
                            <h2>Delete Account</h2>
                            <p>Delete your nostalgify account and its data.</p>
                            <button className="delete-button">DELETE ACCOUNT</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
