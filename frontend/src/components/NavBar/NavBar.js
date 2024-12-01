import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Import the CSS file
import logo from "../../images/logo.png";
import DarkModeToggle from '../../components/DarkModeToggle/DarkModeToggle';


const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMenuOpen(!menuOpen);
    };
    // Close the menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.navbar') && menuOpen) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [menuOpen]);



    return (
        <>
        <header className="navbar">
            {/* Logo and Title */}
            <div className="navbar-logo-title">
                <Link to="/" className="navbar-title">nostalgify</Link>
                <Link to="/" className="rewind">
                    ⏮
                </Link>
            </div>

            {/* Links for Desktop */}
            <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
                <Link to="/login" className="navbar-link">login</Link>
                <Link to="/createaccount" className="navbar-link">create account</Link>
                <Link to="/about" className="navbar-link">contact</Link>
            </div>

            {/* Hamburger Icon */}
            <div className="hamburger-icon" onClick={toggleMobileMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <ul className={`mobile-menu ${menuOpen ? 'show' : ''}`}>
                    <li><Link to="/login" onClick={toggleMobileMenu}>login</Link></li>
                    <li><Link to="/createaccount" onClick={toggleMobileMenu}>create account</Link></li>
                    <li><Link to="/about" onClick={toggleMobileMenu}>contact</Link></li>
                </ul>
            )}
        </header>
        <DarkModeToggle />
    </>
    );
};

export default NavBar;
