import React from 'react';
import { Link } from "react-router-dom";
import './NavBarLoggedIn.css'; // Import the CSS file
import logo from '../../images/logo.png';

const NavBarLoggedIn = () => {
    return (
        <nav className="navbar">
            {/* Logo and Title */}
            <div className="navbar-logo-title">
                <Link to="/" className="navbar-title">
                    nostalgify
                </Link>
                <Link to="/">
                    <img
                        className="navbar-logo"
                        src={logo}
                        alt="Logo"
                    />
                </Link>
            </div>

            {/* Links */}
            <div className="navbar-links">
                <Link to="/profile" className="navbar-link">profile</Link>
                <Link to="/about" className="navbar-link">about us</Link>
            </div>
        </nav>
    );
};

export default NavBarLoggedIn;
