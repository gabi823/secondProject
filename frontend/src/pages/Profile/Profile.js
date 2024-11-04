import React from 'react';
import NavBarLoggedIn from "../../components/NavBarLoggedIn/NavBarLoggedIn";
import { Link } from "react-router-dom";
import './Profile.css';

const Profile = () => {
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
                        your_username
                    </div>
                    <div className="email">
                        youremail123@email.com
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
                    <div className="wrapped-section">
                        <img
                            src="https://via.placeholder.com/160x160"
                            alt="Wrapped Image"
                            className="wrapped-image"
                        />
                        <div className="wrapped-title">
                            Your Wrapped #1<br/>
                            <span className="wrapped-date">Date Created: 2024-10-9</span>
                        </div>
                        <img
                            src="https://via.placeholder.com/28x28"
                            alt="icon"
                            className="icon"
                        />
                    </div>

                    <hr className="divider"/>

                    {/* Other wrapped sections can be duplicated as needed */}

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
