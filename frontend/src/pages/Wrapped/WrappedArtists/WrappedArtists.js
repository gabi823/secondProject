import React from "react";
import { Link } from "react-router-dom";
import { useTrail, useSpring, animated } from "@react-spring/web";
import { motion } from "framer-motion";
import "./WrappedArtists.css";

const WrappedArtists = () => {
    const radius = 325; // Increased radius for more space between central and surrounding artists
    const centerPosition = {
        x: 300, // X coordinate for the center
        y: 300, // Y coordinate for the center
    };
    const artists = [
        { name: "SZA", img: "https://via.placeholder.com/100x100" },
        { name: "Lana Del Rey", img: "https://via.placeholder.com/100x100" },
        { name: "Ed Sheeran", img: "https://via.placeholder.com/100x100" },
        { name: "Ariana Grande", img: "https://via.placeholder.com/100x100" },
        { name: "Justin Bieber", img: "https://via.placeholder.com/100x100" },
        { name: "Rihanna", img: "https://via.placeholder.com/100x100" },
        { name: "Billie Eilish", img: "https://via.placeholder.com/100x100" },
        { name: "Bruno Mars", img: "https://via.placeholder.com/100x100" },
        { name: "The Weeknd", img: "https://via.placeholder.com/100x100" },
    ];

    // Animations for surrounding artists
    const trail = useTrail(artists.length, {
        opacity: 1,
        transform: "scale(1)",
        from: { opacity: 0, transform: "scale(0)" },
        config: { tension: 200, friction: 20, duration: 500 },
        delay: 150, // Start animation after a short delay
        immediate: true,
    });

    // Animation for the central artist
    const centralArtistAnimation = useSpring({
        opacity: 1,
        transform: "scale(1)",
        from: { opacity: 0, transform: "scale(0)" },
        delay: 1000 + artists.length * 100, // Start after surrounding artists are revealed
    });

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
                {/* Surrounding artists in a circle */}
                {trail.map((style, index) => {
                    const angle = (index / artists.length) * 2 * Math.PI; // Calculate the angle for each artist
                    const x = centerPosition.x + radius * Math.cos(angle) - 100; // X position
                    const y = centerPosition.y + radius * Math.sin(angle) - 100; // Y position

                    return (
                        <motion.div
                            whileHover={{scale: 1.05, transition: {duration: 0.01}}}
                        >
                            <animated.div
                                key={index}
                                className="surrounding-artist"
                                style={{
                                    ...style,
                                    position: "absolute",
                                    top: `${y}px`,
                                    left: `${x}px`,
                                }}
                            >
                                <img
                                    src={artists[index].img}
                                    alt={artists[index].name}
                                    className="surrounding-artist-img"
                                />
                                <div
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "700",
                                        marginTop: "5px",
                                        fontFamily: "Manrope",
                                    }}
                                >
                                    {10 - index}. {artists[index].name}
                                </div>
                            </animated.div>
                        </motion.div>
                    );
                })}

                {/* Main artist in the center */}
                <motion.div
                    whileHover={{scale: 1.05, transition: {duration: 0.01}}}
                >
                    <animated.div
                        className="central-artist"
                        style={{
                            ...centralArtistAnimation,
                            position: "absolute",
                            top: `${centerPosition.y}px`,
                            left: `${centerPosition.x}px`,
                            transform: `translate(-50%, -50%)`, // Center the central artist
                        }}
                    >
                        <img
                            src="https://via.placeholder.com/200x200"
                            alt="Taylor Swift"
                            className="central-artist-img"
                        />
                        <div
                            style={{
                                fontSize: "24px",
                                fontWeight: "700",
                                marginTop: "10px",
                                fontFamily: "Manrope",
                            }}
                        >
                            1. Taylor Swift
                        </div>
                    </animated.div>
                </motion.div>
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
