import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login/', {
                username,
                password
            });
            console.log('Login successful:', response.data)
            localStorage.setItem('token', response.data.token)
            // Handle post-login logic here (e.g., redirect to the home page)
        } catch (error) {
            console.error('Login error:', error.response.data);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </form>
    );
};

export default Login;