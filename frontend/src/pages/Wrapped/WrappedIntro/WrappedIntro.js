import React from 'react';
import { Link } from "react-router-dom";
import './WrappedIntro.css'; // Import the CSS file

const WrappedIntro = () => {
    return (
        <div className="wrapper">
            {/* Exit Button */}
            <Link to="/profile" className="exit-button" onClick={() => console.log('Exit clicked')}>
                &times;
            </Link>

            <div className="image-container">
                {Array.from({ length: 9 }).map((_, index) => (
                    <img
                        key={index}
                        style={{ width: 161, height: 161 }}
                        src="https://via.placeholder.com/161x161"
                        alt={`Placeholder image ${index + 1}`}
                    />
                ))}
            </div>

            {/* Centered Text and Button in Horizontal Row */}
            <div className="center-text">
                <div>
                    <h1>Seems like you’ve been busy...</h1>
                    <p>Let’s see what you’ve been up to!</p>
                </div>
                <button className="begin-button">Begin</button>
            </div>

            <div className="image-container-bottom">
                {Array.from({ length: 9 }).map((_, index) => (
                    <img
                        key={index}
                        style={{ width: 161, height: 161 }}
                        src="https://via.placeholder.com/161x161"
                        alt={`Placeholder image ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default WrappedIntro;
