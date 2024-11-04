import React from "react";
import { Link } from "react-router-dom";
import "./WrappedAlbums.css";

const WrappedAlbums = () => {
    return (
        <>
            <div className="header-container">
                <h1 className="header-title">Your Top Albums</h1>
                <Link
                    to="/profile"
                    className="exit-link"
                    onClick={() => console.log("Exit clicked")}
                >
                    &times;
                </Link>
            </div>

            <div className="albums-container">
                <div className="album-wrapper">
                    {[...Array(10)].map((_, index) => (
                        <img
                            key={index}
                            className="album-image"
                            src="https://via.placeholder.com/405x405"
                            alt={`Album ${index + 1}`}
                            style={{ top: `${200 + index * 25}px` }}
                        />
                    ))}

                    <div className="reveal-text">Click to reveal more</div>
                    <div className="album-title">10. Artist(s) - Album Name</div>
                </div>
            </div>

            <Link
                to="/listening-personality"
                className="next-page-link"
                onClick={() => console.log("Next page clicked")}
            >
                &#8594;
            </Link>
        </>
    );
};

export default WrappedAlbums;
