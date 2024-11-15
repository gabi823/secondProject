import React, { useState, useEffect } from 'react';
import NavBar from "../../components/NavBar/NavBar";
import './CreateAccount.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [spotifyClientId, setSpotifyClientId] = useState('');
    const [spotifyRedirectUri, setSpotifyRedirectUri] = useState('');
    const navigate = useNavigate();

    // Fetch Spotify credentials from backend
    useEffect(() => {
        const fetchSpotifyCredentials = async () => {
            try {
                const response = await axios.get('/api/spotify-credentials/');
                setSpotifyClientId(response.data.client_id);
                setSpotifyRedirectUri(response.data.redirect_uri);
            } catch (error) {
                console.error('Error fetching Spotify credentials:', error);
            }
        };

        fetchSpotifyCredentials();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send POST request to Django API
            const response = await axios.post('/api/register/', {
                username,
                password,
                email,
            });
            localStorage.setItem('token', response.data.token);
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${spotifyClientId}&response_type=code&redirect_uri=${spotifyRedirectUri}&scope=user-top-read%20user-library-read`;

        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(Object.values(error.response.data).join(', '));
            } else {
                setMessage('Account creation failed. Please try again.');
            }
        }
    }

    return (
        <>
            <NavBar />
            <div className="images-container">
                <div className="images-row">
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 1" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 2" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 3" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 4" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 5" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 6" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 7" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 8" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 9" />
                </div>
                <div className="images-row second">
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 9" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 10" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 11" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 12" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 13" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 14" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 15" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 16" />
                    <img className="image" src="https://via.placeholder.com/161x161" alt="Placeholder image 17" />
                </div>
            </div>
            <div className="create-account-container">
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
            </div>
        </>
    );
};

export default CreateAccount;
