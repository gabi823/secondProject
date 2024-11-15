import './ProfileWrapped.css';
import React from 'react';

const ProfileWrapped = () => {
    return (
        <>
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
        </>
    );
};

export default ProfileWrapped;

