import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import './WrappedIntro.css'; // Import the CSS file
import { motion } from 'framer-motion';
import axios from 'axios';


const WrappedIntro = () => {
    const [wrappedData, setWrappedData] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Parse query params
    const params = new URLSearchParams(location.search);
    const wrappedId = params.get('wrappedId');

    useEffect(() => {
        // Fetch the wrapped data when wrappedId is available
        if (wrappedId) {
            fetchWrappedData(wrappedId);
        }
    }, [wrappedId]);

    const fetchWrappedData = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/api/get-wrapped-data/?id=${id}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            console.log('Wrapped Data:', response.data);
            setWrappedData(response.data);
        } catch (error) {
            console.error('Error fetching wrapped data:', error);
        }
    };

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
                <h1 className="header-title">{wrappedData ? wrappedData.wrapped_name : 'Loading...'}</h1>
                <Link to="/profile" className="exit-button" onClick={() => console.log("Exit clicked")}>&times;</Link>
            </div>

            <motion.div
                className="background"
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
            >
                <div className="image-row-top">
                    {[...Array(2)].map((_, i) => (
                        <React.Fragment key={i}>
                            {Array.from({length: 9}).map((_, index) => (
                                <img
                                    key={index + i * 9}
                                    src="https://via.placeholder.com/161x161"
                                    alt={`Placeholder image ${index + 1 + i * 9}`}
                                    className="carousel-image"
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </div>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <div className="image-row-bottom">
                    {[...Array(2)].map((_, i) => (
                        <React.Fragment key={i}>
                            {Array.from({length: 9}).map((_, index) => (
                                <img
                                    key={index + i * 9}
                                    src="https://via.placeholder.com/161x161"
                                    alt={`Placeholder image ${index + 1 + i * 9}`}
                                    className="carousel-image"
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </motion.div>

            {/* Centered Text and Button in Horizontal Row */}
                <motion.div className="center-text" initial="hidden" animate="visible" variants={fadeUpVariants}>
                    <div>
                        <h1>Seems like you’ve been busy...</h1>
                        <p>Let’s see what you’ve been up to!</p>
                    </div>
                    <Link to="/top-songs" className="begin-button">Begin</Link>
                </motion.div>
        </>
    );
};

export default WrappedIntro;
