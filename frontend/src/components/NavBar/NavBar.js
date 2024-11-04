import React from 'react';
import { Link } from "react-router-dom";
import './NavBar.css'; // Import the CSS file

const NavBar = () => {
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
                        src="https://via.placeholder.com/50x30"
                        alt="Logo"
                    />
                </Link>
            </div>

            {/* Links */}
            <div className="navbar-links">
                <Link to="/login" className="navbar-link">login</Link>
                <Link to="/createaccount" className="navbar-link">create account</Link>
                <Link to="/about" className="navbar-link">about us</Link>
            </div>
        </nav>
    );
};

export default NavBar;
