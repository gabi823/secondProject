import React, { useState } from 'react';
import axios from 'axios';
import NavBar from "../../components/NavBar/NavBar";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login/', { username, password });
            localStorage.setItem('token', response.data.token);
            setMessage('Login successful!');
        } catch (error) {
            setMessage('Login failed.');
        }
    };

    return (
        <>
            <NavBar />
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    marginTop: 175,
                }}
            >
                <div
                    style={{
                        width: 400,
                        padding: '60px 85px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        background: 'white',
                        borderRadius: 20,
                        border: '1px solid black',
                    }}
                >
                    <div
                        style={{
                            color: 'black',
                            fontSize: 24,
                            fontFamily: 'Manrope',
                            fontWeight: '600',
                            textAlign: 'center',
                            marginBottom: '20px',
                        }}
                    >
                        Login
                    </div>
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <div
                            style={{
                                fontSize: 18,
                                fontFamily: 'Manrope',
                                fontWeight: '500',
                                color: 'black',
                                alignSelf: 'flex-start',
                                marginBottom: '5px',
                            }}
                        >
                            Username:
                        </div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                height: '30px',
                                fontSize: '18px',
                                border: 'none',
                                borderBottom: '1px solid #000',
                                outline: 'none',
                                marginBottom: '20px',
                                fontFamily: 'Manrope',
                            }}
                            required
                        />
                        <div
                            style={{
                                fontSize: 18,
                                fontFamily: 'Manrope',
                                fontWeight: '500',
                                color: 'black',
                                alignSelf: 'flex-start',
                                marginBottom: '5px',
                            }}
                        >
                            Password:
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                height: '30px',
                                fontSize: '18px',
                                border: 'none',
                                borderBottom: '1px solid #000',
                                outline: 'none',
                                marginBottom: '40px',
                                fontFamily: 'Manrope',
                            }}
                            required
                        />
                        <button
                            type="submit"
                            style={{
                                width: '60%',
                                height: '40px',
                                background: 'white',
                                borderRadius: 5,
                                border: '1px solid #000',
                                fontSize: 18,
                                fontFamily: 'Manrope',
                                fontWeight: '600',
                                color: 'black',
                                cursor: 'pointer',
                                transition: 'background 0.3s',
                            }}
                            onMouseEnter={(e) => (e.target.style.background = '#f0f0f0')}
                            onMouseLeave={(e) => (e.target.style.background = 'white')}
                        >
                            Login
                        </button>
                    </form>
                    {message && <p style={{ marginTop: '20px', color: 'red', fontFamily: 'Manrope' }}>{message}</p>}
                </div>
            </div>
        </>
    );
};

export default Login;
