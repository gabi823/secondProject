// WrappedGenres.js
import React from "react";
import { Link } from "react-router-dom";
import './WrappedGenres.css'; // Import the CSS file

// Array of genres with specific line heights CHANGE WHEN LINKING TO API
const genres = [
    { rank: 1, name: "Pop", position: { left: 89, top: 336 } },
    { rank: 2, name: "Indie Pop", position: { left: 295, top: 440 } },
    { rank: 3, name: "Rap", position: { left: 630, top: 564 } },
    { rank: 4, name: "K-Pop", position: { left: 880, top: 642 } },
    { rank: 5, name: "Rock", position: { left: 1260, top: 865 } },
    { rank: 6, name: "R&B", position: { left: 1156, top: 552 } },
    { rank: 7, name: "Jazz", position: { left: 885, top: 433 } },
    { rank: 8, name: "Hip Hop", position: { left: 592, top: 321 } },
];

const WrappedGenres = () => {
    return (
        <div className="wrapper">
            {/* Title and Exit */}
            <div className="title-container">
                <h1 className="title">Your Top Genres</h1>
                <Link
                    to="/profile"
                    className="exit-link"
                    onClick={() => console.log("Exit clicked")}
                >
                    &times;
                </Link>
            </div>

            {/* Genres List */}
            <div className="genres-list">
                {genres.map((genre) => (
                    <div
                        key={genre.rank}
                        className="genre"
                        style={{
                            left: `${genre.position.left}px`,
                            top: `${genre.position.top}px`,
                        }}
                    >
                        {genre.name}
                    </div>
                ))}
            </div>

            {/* Next Page Arrow */}
            <Link
                to="/topartists"
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    fontSize: "36px",
                    textDecoration: "none",
                    color: "black",
                    cursor: "pointer"
                }}
                onClick={() => console.log("Next page clicked")}
            >
                &#8594;
            </Link>
        </div>
    );
};

export default WrappedGenres;
