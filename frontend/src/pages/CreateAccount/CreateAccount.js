import React, { useState, useEffect } from 'react';
import NavBar from "../../components/NavBar/NavBar";
import './CreateAccount.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [topRowImages, setTopRowImages] = useState([]);
    const [bottomRowImages, setBottomRowImages] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/fetch-playlist-images/');
                const images = response.data.images;

                // Divide images into two rows and duplicate for smooth infinite scrolling
                const topImages = images.slice(0, 10);
                const bottomImages = images.slice(10, 20);

                setTopRowImages([...topImages, ...topImages]);  // Duplicate for continuous scrolling
                setBottomRowImages([...bottomImages, ...bottomImages]);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Log user input before sending it to backend
        console.log('Form Data:', { username, password, email });

        try {
            // Send POST request to Django API
            const response = await axios.post('/api/register/', {
                username,
                password,
                email,
            });

            setMessage('Account created successfully!');
            console.log('User created:', response.data);  // Log backend response

            // Redirect to the login page after successful account creation
            navigate('/login');
        } catch (error) {
            console.error('Error:', error.response); // Log full error response
            if (error.response && error.response.data) {
                setMessage(Object.values(error.response.data).join(', '));
            } else {
                setMessage('Account creation failed. Please try again.');
            }
        }
    }

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
            <NavBar/>
            <motion.div
                initial="hidden"
                animate="visible"
                className="images-container"
            >
                <div className="images-row images-row-top">
                    {topRowImages.map((src, index) => (
                        <motion.img
                            key={index}
                            className="carousel-image-top"
                            src={src}
                            alt={`Top image ${index + 1}`}
                            initial="hidden"
                            animate="visible"
                            variants={fadeDownVariants}
                        />
                    ))}
                </div>
                <div className="images-row images-row-bottom">
                    {bottomRowImages.map((src, index) => (
                        <motion.img
                            key={index}
                            className="carousel-image"
                            src={src}
                            alt={`Bottom image ${index + 1}`}
                            initial="hidden"
                            animate="visible"
                            variants={fadeUpVariants}
                        />
                    ))}
                </div>
            </motion.div>

            <motion.div
                className="login-container"
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
            >
                <form className="create-account-form" onSubmit={handleSubmit}>
                    <div className="form-heading">Create Account</div>

                    <div className="form-label">Username:</div>
                    <input
                        type="text"
                        className="form-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <div className="form-label">Password:</div>
                    <input
                        type="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="form-label">Email:</div>
                    <input
                        type="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className="create-button">Create Account</button>

                    {/* Show feedback message */}
                    {message && <p className="form-message">{message}</p>}
                </form>
            </motion.div>
        </>
    );
};

export default CreateAccount;
