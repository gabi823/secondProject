import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import './WrappedIntro.css'; // Import the CSS file
import { motion } from 'framer-motion';
import axios from 'axios';
import ScrollingSongs from './ScrollingSongs';
import DarkModeToggle from '../../../components/DarkModeToggle/DarkModeToggle';


const WrappedIntro = () => {
    const [wrappedData, setWrappedData] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Parse query params
    const wrappedConfig = location.state?.wrappedConfig;

    useEffect(() => {
        // Fetch the wrapped data when wrappedId is available
        if (wrappedConfig?.wrappedId) {
            fetchWrappedData(wrappedConfig.wrappedId);
        }
    }, [wrappedConfig]);

    const fetchWrappedData = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://secondproject-8lyv.onrender.com/api/get-wrapped-data/?id=${id}`, {
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

    const handleBegin = () => {
        console.log('Starting wrapped with time range:', wrappedData?.time_range || 'long_term');
        navigate('/top-songs', {
            state: {
                wrappedConfig: {
                    ...wrappedConfig,
                    wrappedData: wrappedData
                }
            }
        });
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
                <h1 className="header-title">{wrappedData ? wrappedData.wrapped_name : '   '}</h1>
                <Link to="/profile" className="exit-button" onClick={() => console.log("Exit clicked")}>&times;</Link>
            </div>

            <ScrollingSongs />

            {/* Centered Text and Button in Horizontal Row */}
                <motion.div className="center-text" initial="hidden" animate="visible" variants={fadeUpVariants}>
                    <div>
                        <h1>Seems like you’ve been busy...</h1>
                        <p>Let’s see what you’ve been up to!</p>
                    </div>
                    <button onClick={handleBegin} className="begin-button">Begin</button>
                </motion.div>
            <DarkModeToggle />

        </>
    );
};

export default WrappedIntro;
