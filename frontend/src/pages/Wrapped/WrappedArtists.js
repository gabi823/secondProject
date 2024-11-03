import React from "react";
import { Link } from "react-router-dom";

const Artists = () => {
    const radius = 325; // Increased radius for more space between central and surrounding artists
    const centerPosition = {
        x: 300, // X coordinate for the center (adjust based on container width)
        y: 300, // Y coordinate for the center (adjust based on container height)
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
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "0" }}>
            {/* Title and Exit Button */}
            <div style={{ position: "absolute", top: "20px", left: "20px", right: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1 style={{ fontSize: "36px", fontWeight: "700", fontFamily: "Manrope", margin: "0" }}>Your Top Artists</h1>
                <Link
                    to="/profile"
                    style={{
                        fontSize: "28px",
                        position: "relative",
                        top: "-8px", // Adjust this value as needed for less spacing above
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textDecoration: "none",
                    }}
                    onClick={() => console.log("Exit clicked")}
                >
                    &times;
                </Link>
            </div>

            {/* Container for all artists */}
            <div style={{ position: "relative", width: "600px", height: "600px" }}>
                {/* Main artist in the center */}
                <div style={{
                    position: "absolute",
                    top: `${centerPosition.y}px`,
                    left: `${centerPosition.x}px`,
                    transform: "translate(-50%, -50%)",
                    textAlign: "center"
                }}>
                    <img
                        src="https://via.placeholder.com/200x200"
                        alt="Taylor Swift"
                        style={{ width: "300px", height: "300px", borderRadius: "50%" }}
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
                            style={{
                                position: "absolute",
                                top: `${y}px`,
                                left: `${x}px`,
                                transform: "translate(-50%, -50%)",
                                textAlign: "center"
                            }}
                        >
                            <img
                                src={artist.img}
                                alt={artist.name}
                                style={{ width: "175px", height: "175px", borderRadius: "50%" }}
                            />
                            <div style={{ fontSize: "16px", fontWeight: "700", marginTop: "5px", fontFamily: "Manrope" }}>{index + 2}. {artist.name}</div>
                        </div>
                    );
                })}
            </div>

            {/* Next Page Link */}
            <Link
                to="/next" // replace with the actual path to the next page
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

export default Artists;
