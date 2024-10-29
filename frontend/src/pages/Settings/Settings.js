import React from 'react';
import NavBarLoggedIn from "../../components/NavBarLoggedIn/NavBarLoggedIn";
import {Link} from "react-router-dom";

const Settings = () => {
    return (
        <>
            <NavBarLoggedIn />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '20px',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
            }}>
                {/* Left section with Settings title and Back button */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '10px',
                    marginRight: '75px',
                    marginTop: '15px'
                }}>
                    <h1 style={{
                        color: 'black',
                        fontSize: '2.5rem',
                        fontFamily: 'Manrope',
                        fontWeight: '700',
                        marginBottom: '0px',
                    }}>Settings</h1>
                    <Link to="/profile" style={{
                        border: 'none',
                        background: 'none',
                        color: 'black',
                        fontSize: '1rem',
                        fontFamily: 'Manrope',
                        fontWeight: 500,
                        cursor: 'pointer',
                        marginTop: '0px',
                        textDecoration:'none'
                    }}>
                        <span style={{fontSize: '1.2rem'}}>←</span>
                        back to profile
                    </Link>
                </div>

                {/* Settings items container */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: '700px',
                    gap: '20px',
                    marginTop: '40px'
                }}>
                    {/* Spotify Account Section */}
                    <div style={{
                        background: 'white',
                        borderRadius: '10px',
                        border: '1px solid black',
                        width: '100%',
                        padding: '20px',
                        boxSizing: 'border-box',
                    }}>
                        <h2 style={{ fontSize: '1.5rem', fontFamily: 'Manrope', fontWeight: 600, marginTop:'0px' }}>Spotify Account</h2>
                        <p style={{ fontSize: '1rem', fontFamily: 'Manrope', fontWeight: 400 }}>The Spotify account you’re signed in with.</p>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: '1.25rem', fontFamily: 'Manrope', fontWeight: 600 }}>your_username</span>
                            <button style={{
                                color: '#1807FF',
                                fontSize: '1rem',
                                fontFamily: 'Manrope',
                                fontWeight: 800,
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer'
                            }}>CHANGE</button>
                        </div>
                    </div>

                    {/* Email Section */}
                    <div style={{
                        background: 'white',
                        borderRadius: '10px',
                        border: '1px solid black',
                        width: '100%',
                        padding: '20px',
                        boxSizing: 'border-box',
                    }}>
                        <h2 style={{ fontSize: '1.5rem', fontFamily: 'Manrope', fontWeight: 600, marginTop:'0px' }}>Email</h2>
                        <p style={{ fontSize: '1rem', fontFamily: 'Manrope', fontWeight: 400 }}>The email associated with your account.</p>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: '1.25rem', fontFamily: 'Manrope', fontWeight: 600 }}>youremail@email.com</span>
                            <button style={{
                                color: '#1807FF',
                                fontSize: '1rem',
                                fontFamily: 'Manrope',
                                fontWeight: 800,
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer'
                            }}>CHANGE</button>
                        </div>
                    </div>

                    {/* Row for Log Out and Delete Account Sections */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        gap: '20px',
                    }}>
                        {/* Log Out Section */}
                        <div style={{
                            background: 'white',
                            borderRadius: '10px',
                            border: '1px solid black',
                            flex: 1,
                            padding: '20px',
                            boxSizing: 'border-box',
                        }}>
                            <h2 style={{ fontSize: '1.5rem', fontFamily: 'Manrope', fontWeight: 600, marginTop:'0px' }}>Log Out</h2>
                            <p style={{ fontSize: '1rem', fontFamily: 'Manrope', fontWeight: 400 }}>Log out of your account in this browser.</p>
                            <button style={{
                                color: '#1807FF',
                                fontSize: '1.25rem',
                                fontFamily: 'Manrope',
                                fontWeight: 800,
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                marginTop:'20px'
                            }}>LOG OUT</button>
                        </div>

                        {/* Delete Account Section */}
                        <div style={{
                            background: 'white',
                            borderRadius: '10px',
                            border: '1px solid black',
                            flex: 1,
                            padding: '20px',
                            boxSizing: 'border-box',
                        }}>
                            <h2 style={{ fontSize: '1.5rem', fontFamily: 'Manrope', fontWeight: 600, marginTop:'0px' }}>Delete Account</h2>
                            <p style={{ fontSize: '1rem', fontFamily: 'Manrope', fontWeight: 400 }}>Delete your nostalgify account and its data.</p>
                            <button style={{
                                color: '#1807FF',
                                fontSize: '1.25rem',
                                fontFamily: 'Manrope',
                                fontWeight: 800,
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                marginLeft: '0px'
                            }}>DELETE ACCOUNT</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
