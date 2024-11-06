import React from "react";
import { Link } from "react-router-dom";
import "./WrappedArtists.css";

const WrappedArtists = () => {
    const radius = 325; // Increased radius for more space between central and surrounding artists
    const centerPosition = {
        x: 300, // X coordinate for the center
        y: 300, // Y coordinate for the center
    };
    const artists = [
        { name: "The Weeknd", img: "https://via.placeholder.com/100x100" },
        { name: "Bruno Mars", img: "https://via.placeholder.com/100x100" },
        { name: "Billie Eilish", img: "https://via.placeholder.com/100x100" },
        { name: "Rihanna", img: "https://via.placeholder.com/100x100" },
        { name: "Justin Bieber", img: "https://via.placeholder.com/100x100" },
        { name: "Ariana Grande", img: "https://via.placeholder.com/100x100" },
        { name: "Ed Sheeran", img: "https://via.placeholder.com/100x100" },
        { name: "SZA", img: "https://via.placeholder.com/100x100" },
        { name: "Lana Del Rey", img: "https://via.placeholder.com/100x100" },
    ];

    return (
        <div className="artists-container">
            {/* Title and Exit Button */}
            <div className="header-container">
                <h1 className="header-title">Your Top Artists</h1>
                <Link
                    to="/profile"
                    className="exit-link"
                    onClick={() => console.log("Exit clicked")}
                >
                    &times;
                </Link>
            </div>

            {/* Container for all artists */}
            <div className="artist-wrapper">
                {/* Main artist in the center */}
                <div className="central-artist">
                    <img
                        src="https://via.placeholder.com/200x200"
                        alt="Taylor Swift"
                        className="central-artist-img"
                    />
                    <div style={{ fontSize: "24px", fontWeight: "700", marginTop: "10px", fontFamily: "Manrope" }}>1. Taylor Swift</div>
                </div>

                {/* Surrounding artists in a circle */}
                {artists.map((artist, index) => {
                    const angle = (index / artists.length) * 2 * Math.PI; // Calculate the angle for each artist
                    const x = centerPosition.x + radius * Math.cos(angle); // X position
                    const y = centerPosition.y + radius * Math.sin(angle); // Y position

                    return (
                        <div
                            key={index}
                            className="surrounding-artist"
                            style={{
                                top: `${y}px`,
                                left: `${x}px`,
                            }}
                        >
                            <img
                                src={artist.img}
                                alt={artist.name}
                                className="surrounding-artist-img"
                            />
                            <div style={{ fontSize: "16px", fontWeight: "700", marginTop: "5px", fontFamily: "Manrope" }}>{index + 2}. {artist.name}</div>
                        </div>
                    );
                })}
            </div>

            {/* Next Page Link */}
            <Link
                to="/top-albums"
                className="next-page-link"
                onClick={() => console.log("Next page clicked")}
            >
                &#8594;
            </Link>
        </div>
    );
};

export default WrappedArtists;
