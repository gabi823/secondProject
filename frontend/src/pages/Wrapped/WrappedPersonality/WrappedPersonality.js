import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import './WrappedPersonality.css';
import { listeningPersonalities } from './listeningPersonalities';
import DarkModeToggle from '../../../components/DarkModeToggle/DarkModeToggle';

const WrappedPersonality = ({ personalityIndex = 0 }) => {
    const { name, color, description } = listeningPersonalities[personalityIndex];

    const spinAnimation = {
        animate: { rotate: 360 },
        transition: { duration: 8, repeat: Infinity, ease: "linear" },
    };

    const spinReverseAnimation = {
        animate: { rotate: -360 },
        transition: { duration: 6, repeat: Infinity, ease: "linear" },
    };

    const containerVariants = {
        hidden: {
            scale: 0, // Start scaled down
            opacity: 0, // Hidden
        },
        visible: {
            scale: 1, // Full size
            opacity: 1, // Fully visible
            transition: {
                duration: 1.5, // Animation duration
                ease: "easeOut", // Smooth easing
            },
        },
    };

    return (
        <>
            <div className="header-container">
                <h1 className="header-title">Your Listening Personality</h1>
                <Link
                    to="/profile"
                    className="exit-link"
                    onClick={() => console.log("Exit clicked")}
                >
                    &times;
                </Link>
            </div>
            <div className='whole-container'>
                <motion.div className="personality-container"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="outer-circle"
                        style={{ transformOrigin: "center" }}
                        {...spinAnimation}
                    ></motion.div>
                    <motion.div
                        className="middle-circle"
                        style={{ transformOrigin: "center" }}
                        {...spinReverseAnimation}
                    ></motion.div>
                    <motion.div
                        className="inner-circle"
                        style={{ transformOrigin: "center" }}
                        {...spinAnimation}
                    ></motion.div>
                    <motion.div
                        className="dotted-circle"
                        style={{ transformOrigin: "center" }}
                        {...spinReverseAnimation}
                    ></motion.div>
                    <div
                        className="core-circle"
                        style={{ backgroundColor: color }}
                    ></div>
                    <div className="personality-name">{name}</div>
                    <div className="personality-description">{description}</div>
                </motion.div>
            </div>

            <Link
                to="/your-playlist" // Replace with the actual path to the next page
                className="next-button"
                onClick={() => console.log("Next page clicked")}
            >
                &#8594;
            </Link>
            <DarkModeToggle />
        </>
    );
};

export default WrappedPersonality;
