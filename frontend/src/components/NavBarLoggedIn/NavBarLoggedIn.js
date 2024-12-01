import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import './NavBarLoggedIn.css'; // Import the CSS file
import DarkModeToggle from '../../components/DarkModeToggle/DarkModeToggle';



const NavBarLoggedIn = () => {
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
        <nav className="navbar">
            {/* Logo and Title */}
            <div className="navbar-logo-title">
                <Link to="/" className="navbar-title">
                    nostalgify
                </Link>
                <Link to="/" className="rewind">
                    ⏮
                </Link>
            </div>

            {/* Hamburger Icon */}
            <div className="hamburger-icon" onClick={toggleMobileMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>

            {/* Links */}
            <div className="navbar-links">
                <Link to="/profile" className="navbar-link">profile</Link>
                <Link to="/about" className="navbar-link">contact</Link>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <ul className={`mobile-menu ${menuOpen ? 'show' : ''}`}>
                    <li><Link to="/profile" onClick={toggleMobileMenu}>profile</Link></li>
                    <li><Link to="/about" onClick={toggleMobileMenu}>contact</Link></li>
                </ul>
            )}

            <DarkModeToggle />
        </nav>
    );
};

export default NavBarLoggedIn;
