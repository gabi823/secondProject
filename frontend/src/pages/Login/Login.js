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
                    <img className="imageTop image1" src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 1"/>
                    <img className="imageTop image2" src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 2"/>
                    <img className="imageTop image3" src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 3"/>
                    <img className="imageTop image4" src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 4"/>
                    <img className="imageTop image5" src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 5"/>
                    <img className="imageTop image6" src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 6"/>
                    <img className="imageTop image7" src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 7"/>
                    <img className="imageTop image8" src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 8"/>
                    <img className="imageTop image9" src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 9"/>

                </div>
                <div className="images-row-second">
                    <img className="imageBottom image1" src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 9"/>
                    <img className="imageBottom image2" src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 10"/>
                    <img className="imageBottom image3" src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 11"/>
                    <img className="imageBottom image4" src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 12"/>
                    <img className="imageBottom image5" src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 13"/>
                    <img className="imageBottom image6" src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 14"/>
                    <img className="imageBottom image7" src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 15"/>
                    <img className="imageBottom image8" src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 16"/>
                    <img className="imageBottom image9" src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 17"/>
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
