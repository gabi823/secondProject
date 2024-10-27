import React from 'react';
import { Link } from "react-router-dom";


const NavBarLoggedIn = () => {
    return (
        <nav style={{
            width: '100%',
            height: '193px',
            background: 'white',
            opacity: 0.85,
            borderBottom: '1px rgba(0, 0, 0, 0.75) solid',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 70px',
            boxSizing: 'border-box'
        }}>
            {/* Logo and Title */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
            }}>
                <Link to="/" style={{
                    color: 'black',
                    fontSize: '24px',
                    fontFamily: 'Manrope',
                    fontWeight: '400',
                    whiteSpace: 'nowrap',
                    textDecoration: 'none',
                }}>
                    nostalgify
                </Link>
                <Link to="/">
                    <img
                        style={{width: '50px', height: '30px'}}
                        src="https://via.placeholder.com/50x30"
                        alt="Logo"
                    />
                </Link>
            </div>

            {/* Links */}
            <div style={{
                display: 'flex',
                gap: '80px',
                alignItems: 'center'
            }}>
                <Link to="/profile" style={{
                    color: 'black',
                    fontSize: '24px',
                    fontFamily: 'Manrope',
                    fontWeight: '400',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap'
                }}>
                    profile
                </Link>
                <Link to="/about" style={{
                    color: 'black',
                    fontSize: '24px',
                    fontFamily: 'Manrope',
                    fontWeight: '400',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap'
                }}>
                    about us
                </Link>
            </div>
        </nav>
    );
};

export default NavBarLoggedIn;