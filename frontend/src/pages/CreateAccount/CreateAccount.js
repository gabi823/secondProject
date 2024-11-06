import React, { useState } from 'react';
import NavBar from "../../components/NavBar/NavBar";
import './CreateAccount.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

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
