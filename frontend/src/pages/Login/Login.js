import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [topRowImages, setTopRowImages] = useState([]);
    const [bottomRowImages, setBottomRowImages] = useState([]);
    const [fetchError, setFetchError] = useState('');
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
                setFetchError('Failed to fetch images.');
            }
        };

        fetchImages();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login/', { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/profile');
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <>
            <NavBar />
            <div className="images-container">
                {fetchError && <p className="fetch-error">{fetchError}</p>}
                {/* Top row of images */}
                <div className="images-row images-row-top">
                    {topRowImages.map((src, index) => (
                        <img key={index} className="carousel-image" src={src} alt={`Top image ${index + 1}`} />
                    ))}
                </div>

                {/* Bottom row of images */}
                <div className="images-row images-row-bottom">
                    {bottomRowImages.map((src, index) => (
                        <img key={index} className="carousel-image" src={src} alt={`Bottom image ${index + 1}`} />
                    ))}
                </div>
            </div>

            <div className="login-container">
                <div className="login-box">
                    <div className="login-title">Login</div>
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
                            <button type="submit" className="login-button">Login</button>
                        </div>
                    </form>
                    {error && <p className="login-error">{error}</p>}
                </div>
            </div>
        </>
    );
};

export default Login;
