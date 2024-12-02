import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Login.css';
import DarkModeToggle from '../../components/DarkModeToggle/DarkModeToggle';
import {Grid} from "@mui/material";
import NavBarLoggedIn from "../../components/NavBarLoggedIn/NavBarLoggedIn";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', { username, password });
            const token = response.data.token;

            localStorage.setItem('token', token);
            navigate('/profile');
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please check your credentials.');
        }
    };

    // Framer Motion animation settings
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <>
            <Grid container spacing={0}>
               <Grid item xs={12}>
                     <NavBar/>
               </Grid>

                   <Grid item xs={12}>
            <motion.div
                className="login-container"
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
            >
                <div className="login-box">
                    <div className="login-title">
                        Login
                    </div>
                    <form onSubmit={handleSubmit} className="login-form">
                        <label className="login-label">Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="login-input"
                            required
                        />
                        <label className="login-label">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                            required
                        />
                        <div className="login-button-container">
                            <button type="submit" className="login-button">
                                Login
                            </button>
                        </div>
                    </form>
                    {error && <p className="login-error">{error}</p>}
                </div>
            </motion.div>
                   </Grid>
            </Grid>
        </>
    );
};

export default Login;
