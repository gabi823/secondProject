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
            <NavBar/>
            <div className="images-container">
                <div className="images-row">
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 1"/>
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 2"/>
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 3"/>
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 4"/>
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 5"/>
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 6"/>
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 7"/>
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 8"/>
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 9"/>
                </div>
                <div className="images-row second">
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 9"/>
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 10"/>
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 11"/>
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 12"/>
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 13"/>
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 14"/>
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 15"/>
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 16"/>
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 17"/>
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
