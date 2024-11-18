import React from 'react';
import { Link } from "react-router-dom";
import './WrappedIntro.css'; // Import the CSS file
import { motion } from 'framer-motion';


const WrappedIntro = () => {
    // Framer Motion animation settings
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const fadeDownVariants = {
        hidden: { opacity: 0, y: 0 },
        visible: { opacity: 1, y: 8, transition: { duration: 0.5 } },
    };

    return (
        <>
        <div className="header">
            <h1 className="header-title"></h1>
            <Link to="/profile" className="exit-button" onClick={() => console.log("Exit clicked")}>&times;</Link>
        </div>
    <motion.div className="wrapper"
        initial="hidden"
                animate="visible"
    >
        <motion.div className="image-container" initial="hidden" animate="visible" variants={fadeDownVariants}>
            {Array.from({length: 9}).map((_, index) => (
                <img
                    key={index}
                    style={{width: 161, height: 161}}
                        src="https://via.placeholder.com/161x161"
                        alt={`Placeholder image ${index + 1}`}
                    />
                ))}
            </motion.div>

            {/* Centered Text and Button in Horizontal Row */}
            <motion.div className="center-text" initial="hidden" animate="visible" variants={fadeUpVariants}>
                <div>
                    <h1>Seems like you’ve been busy...</h1>
                    <p>Let’s see what you’ve been up to!</p>
                </div>
                <Link to="/top-songs" className="begin-button">Begin</Link>
            </motion.div>

            <motion.div className="image-container-bottom" initial="hidden" animate="visible" variants={fadeUpVariants}>
                {Array.from({length: 9}).map((_, index) => (
                    <img
                        key={index}
                        style={{width: 161, height: 161}}
                        src="https://via.placeholder.com/161x161"
                        alt={`Placeholder image ${index + 1}`}
                    />
                ))}
            </motion.div>
        </motion.div>
        </>
    );
};

export default WrappedIntro;
