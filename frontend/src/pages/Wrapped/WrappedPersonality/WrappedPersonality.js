import React from "react";
import { Link } from "react-router-dom";
import './WrappedPersonality.css';
import { listeningPersonalities } from './listeningPersonalities';

const WrappedPersonality = ({ personalityIndex = 0 }) => {
    const { name, color, description } = listeningPersonalities[personalityIndex];

    return (
        <>
            <div className="header">
                <h1 className="header-title">Your Listening Personality</h1>
                <Link to="/profile" className="exit-button" onClick={() => console.log("Exit clicked")}>&times;</Link>
            </div>

            <div className="personality-container">
                <div className="bottom-line"></div>
                <div className="outer-circle"></div>
                <div className="middle-circle"></div>
                <div className="inner-circle"></div>
                <div className="dotted-circle"></div>
                <div className="core-circle" style={{ backgroundColor: color }}></div>
                <div className="personality-name">{name}</div>
                <div className="personality-description">{description}</div>
            </div>

            <Link
                to="/listening-personality"
                className="next-page-button"
                onClick={() => console.log("Next page clicked")}
            >
                &#8594;
            </Link>
        </>
    );
};

export default WrappedPersonality;
