import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTrail, useSpring, animated } from "@react-spring/web";
import { motion } from "framer-motion";
import axios from "axios";
import "./WrappedArtists.css";
import "./WrappedArtists-mobile.css";

const WrappedArtists = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 393);
    const [visibleArtists, setVisibleArtists] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 393);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch artists data
    useEffect(() => {
        const fetchTopArtists = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get("http://127.0.0.1:8000/api/top-artists/", {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                setTopArtists(response.data.top_artists);
                setLoading(false);

                if (isMobile) {
                    response.data.top_artists.forEach((artist, index) => {
                        setTimeout(() => {
                            setVisibleArtists(prev => [...prev, artist]);
                        }, 200 * (index + 1));
                    });
                }
            } catch (err) {
                console.error("Error fetching top artists:", err);
                setLoading(false);
            }
        };

        fetchTopArtists();
    }, [isMobile]);

    // Desktop animations
    const trail = useTrail(9, {
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
        delay: 1000 + 9 * 100,
    });

    if (loading) return <div>Loading your top artists...</div>;

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
                        {/* Center artist */}
                        {topArtists[0] && (
                            <motion.div
                                whileHover={{scale: 1.05}}
                                className="central-artist"
                            >
                                <img
                                    src={topArtists[0].image_url}
                                    alt={topArtists[0].name}
                                    className="central-artist-img"
                                />
                                <div style={{
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    marginTop: "10px",
                                    fontFamily: "Manrope",
                                }}>
                                    {topArtists[0].rank}. {topArtists[0].name}
                                </div>
                            </motion.div>
                        )}

                        {/* Surrounding artists */}
                        {visibleArtists.slice(1).map((artist, index) => (
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
                                        delay: index * 0.2
                                    }
                                }}
                                viewport={{once: true}}
                            >
                                <img
                                    src={artist.image_url}
                                    alt={artist.name}
                                    className="surrounding-artist-img"
                                />
                                <div className="artist-rank">
                                    {artist.rank}. {artist.name}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

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
                    const artist = topArtists[index + 1]; // Skip first artist (center)
                    if (!artist) return null;

                    const angle = (index / (topArtists.length - 1)) * 2 * Math.PI;
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
                                    src={artist.image_url}
                                    alt={artist.name}
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
                                    {artist.rank}. {artist.name}
                                </div>
                            </animated.div>
                        </motion.div>
                    );
                })}

                {/* Main artist in the center */}
                {topArtists[0] && (
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
                                src={topArtists[0].image_url}
                                alt={topArtists[0].name}
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
                                {topArtists[0].rank}. {topArtists[0].name}
                            </div>
                        </animated.div>
                    </motion.div>
                )}
            </motion.div>

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