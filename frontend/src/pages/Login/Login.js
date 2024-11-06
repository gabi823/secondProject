import React, { useState } from 'react';
import axios from 'axios';
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
            <div className="login-background">
                <div className="login-image-row">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <img
                            key={index}
                            src="https://via.placeholder.com/161x161"
                            alt={`Placeholder image ${index + 1}`}
                            className="login-image"
                        />
                    ))}
                </div>

                <div className="login-image-row">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <img
                            key={index + 9}
                            src="https://via.placeholder.com/161x161"
                            alt={`Placeholder image ${index + 10}`}
                            className="login-image"
                        />
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
                            placeholder=""
                            className="login-input"
                            required
                        />

                        <label className="login-label">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=""
                            className="login-input"
                            required
                        />

                        <div className="login-button-container">
                            <button
                                type="submit"
                                className="login-button"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    {error && <p className="login-error">{error}</p>}
                </div>
            </div>
        </>
    );
};

export default Login;
