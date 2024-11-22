// src/components/SpotifyLinkModal/SpotifyLinkModal.js
import React from 'react';
import './SpotifyLinkModal.css';

const SpotifyLinkModal = ({ onLink }) => {
    const handleClick = () => {
        console.log('Link button clicked'); // Debug log
        onLink();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Please Link Your Spotify Account</h2>
                <p>To use all features, please connect your Spotify account.</p>
                <button
                    className="link-button"
                    onClick={handleClick}
                >
                    Link Spotify
                </button>
            </div>
        </div>
    );
};

export default SpotifyLinkModal;