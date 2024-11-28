import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTrail, useSpring, animated } from "@react-spring/web";
import { motion } from "framer-motion";
import "./WrappedArtists.css";
import "./WrappedArtists-mobile.css";

const WrappedArtists = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 393);
    const [visibleArtists, setVisibleArtists] = useState([]);

    const artists = useMemo(() => [
        { name: "SZA", img: "https://via.placeholder.com/100x100" },
        { name: "Lana Del Rey", img: "https://via.placeholder.com/100x100" },
        { name: "Ed Sheeran", img: "https://via.placeholder.com/100x100" },
        { name: "Ariana Grande", img: "https://via.placeholder.com/100x100" },
        { name: "Justin Bieber", img: "https://via.placeholder.com/100x100" },
        { name: "Rihanna", img: "https://via.placeholder.com/100x100" },
        { name: "Billie Eilish", img: "https://via.placeholder.com/100x100" },
        { name: "Bruno Mars", img: "https://via.placeholder.com/100x100" },
        { name: "The Weeknd", img: "https://via.placeholder.com/100x100" },
    ], []);

    const topArtists = useMemo(() => artists.slice(0, 10), [artists]); // Limit to top 10

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 393);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mobile-specific sequential reveal effect
    useEffect(() => {
        if (isMobile) {
            const revealArtists = () => {
                artists.forEach((artist, index) => {
                    setTimeout(() => {
                        setVisibleArtists(prev => [...prev, artist]);
                    }, 200 * (index + 1));
                });
            };

            revealArtists();
        }
    }, [isMobile, artists]);

    // Desktop animations
    const trail = useTrail(artists.length, {
        opacity: 1,
        transform: "scale(1)",
        from: { opacity: 0, transform: "scale(0)" },
        config: { tension: 200, friction: 20, duration: 500 },
        delay: 150,
        immediate: true,
    });

    const centralArtistAnimation = useSpring({
        opacity: 1,
        transform: "scale(1)",
        from: { opacity: 0, transform: "scale(0)" },
        delay: 1000 + artists.length * 100,
    });

    // Mobile Render
    if (isMobile) {
        return (
            <div className="artist-scroll-container">
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
                <div className="artists-scroll-content">
                    <div className="artist-wrapper">
                        {/* Main artist in the center - appears first */}
                        <motion.div
                            key="central-artist"
                            whileHover={{scale: 1.05, transition: {duration: 0.01}}}
                            className="central-artist"
                            initial={{opacity: 0, scale: 0}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{
                                delay: 0,
                                type: "spring",
                                stiffness: 300
                            }}
                        >
                            <img
                                src="https://via.placeholder.com/200x200"
                                alt="Taylor Swift"
                            className="central-artist-img"
                            />
                            <div
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    marginTop: "10px",
                                    fontFamily: "Manrope",
                                }}
                            >
                                1. Taylor Swift
                            </div>
                        </motion.div>
                    </div>

                </div>

                <div className="artist-wrapper">
                    {/* Surrounding artists in a grid */}
                    {visibleArtists.slice(0, 9).map((artist, index) => (
                        <motion.div
                            key={artist.name}
                            whileHover={{scale: 1.05}}
                            className="surrounding-artist"
                            initial={{opacity: 0, y: 50}}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.5,
                                    delay: (index + 1) * 0.2
                                }
                            }}
                            viewport={{once: true}}
                        >
                            <img src={artist.img} alt={artist.name} className="surrounding-artist-img"/>
                            <div className="artist-rank">
                                {index + 2}. {artist.name}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Fixed Next Page Link */}
                <Link
                    to="/top-albums"
                    className="next-page-link"
                    onClick={() => console.log("Next page clicked")}
                >
                    &#8594;
                </Link>
            </div>
        );
    }

    // Desktop Render
    const radius = 280;
    const centerPosition = {
        x: 300,
        y: 300,
    };

    return (
        <div className="artists-container">
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

            <motion.div className="artist-wrapper">
                {/* Surrounding artists in a circle */}
                {trail.map((style, index) => {
                    const angle = (index / artists.length) * 2 * Math.PI;
                    const x = centerPosition.x + radius * Math.cos(angle) - 75;
                    const y = centerPosition.y + radius * Math.sin(angle) - 75;

                    return (
                        <motion.div
                            key={index}
                            whileHover={{scale: 1.05, transition: {duration: 0.01}}}
                        >
                            <animated.div
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
                                        marginTop: "3px",
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
                            transform: `translate(-50%, -50%)`,
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
            </motion.div>

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