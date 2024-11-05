import React from 'react';
import NavBarLoggedIn from "../../components/NavBarLoggedIn/NavBarLoggedIn";
import { Link } from "react-router-dom";
import './Selection.css'; // Import the CSS file

const Selection = () => {
    return (
        <>
            <NavBarLoggedIn />
            <div className="selection-container">
                <div className="main-container">
                    <div className="selection-left-container">
                        <div className="selection-title">Let’s look back, shall we?</div>

                        <div className="profile-wrapped">
                            <div className="profile-wrapped-label">Name Your Wrapped:</div>
                            <input
                                type="text"
                                placeholder="Enter a name"
                                className="wrapped-input"
                            />
                        </div>

                        <div className="selection-actions">
                            <div className="dropdown-container">
                                <select className="dropdown-select">
                                    <option value="" disabled selected>Select time period</option>
                                    <option value="short">Short Term</option>
                                    <option value="medium">Medium Term</option>
                                    <option value="long">Long Term</option>
                                </select>
                                <span className="dropdown-arrow">▼</span>
                            </div>

                            <div className="go-button">
                                <span>Go</span>
                            </div>
                        </div>
                    </div>

                    <div className="selection-right-container">
                        <img className="placeholder-img" src="https://via.placeholder.com/230x231" alt="placeholder" />
                        <img className="placeholder-img" src="https://via.placeholder.com/230x231" alt="placeholder" />
                        <img className="placeholder-img" src="https://via.placeholder.com/230x231" alt="placeholder" />
                        <img className="placeholder-img" src="https://via.placeholder.com/230x231" alt="placeholder" />
                        <img className="placeholder-img" src="https://via.placeholder.com/230x231" alt="placeholder" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Selection;
