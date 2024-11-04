import React, { useState } from 'react';
import axios from 'axios';
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from 'react-router-dom';

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

            // Save token in localStorage
            localStorage.setItem('token', response.data.token);

            navigate('/profile');
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <>
            <NavBar/>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: '-1',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 28,
                    marginTop: 180,
                }}>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 1"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 2"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 3"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 4"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 5"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 6"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 7"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 8"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 9"/>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 28,
                    marginTop: 200,
                }}>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 9"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 10"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 11"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 12"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 13"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 14"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 15"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 16"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 17"/>
                </div>
            </div>

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
                    <form onSubmit={handleSubmit} style={{width: '100%'}}>
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
                            placeholder='Username'
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
                            placeholder='Password'
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
                        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
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
                        </div>
                    </form>
                    {message && <p style={{marginTop: '20px', color: 'red', fontFamily: 'Manrope'}}>{message}</p>}
                </div>
            </div>
        </>
    );
};

export default Login;
