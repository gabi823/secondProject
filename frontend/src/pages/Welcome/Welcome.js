import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar.js';
import './Welcome.css';

const Welcome = () => {

    const navigate = useNavigate();

    const imagesColumn1 = [
        "https://via.placeholder.com/308x308",
        "https://via.placeholder.com/307x308",
        "https://via.placeholder.com/307x308",
        "https://via.placeholder.com/307x308"
    ];

    const imagesColumn2 = [
        "https://via.placeholder.com/230x231",
        "https://via.placeholder.com/230x231",
        "https://via.placeholder.com/230x231",
        "https://via.placeholder.com/230x231",
        "https://via.placeholder.com/230x231"
    ];

    const imagesColumn3 = [
        "https://via.placeholder.com/308x301",
        "https://via.placeholder.com/307x308",
        "https://via.placeholder.com/307x308",
        "https://via.placeholder.com/307x308"
    ];

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <NavBar />
            <div className="welcome-container">
                <div className="image-column image-column1">
                    {imagesColumn1.map((src, index) => (
                        <img key={index} src={src} alt={`image${index + 1}`}/>
                    ))}
                </div>
                <div className="image-column image-column2">
                    {imagesColumn2.map((src, index) => (
                        <img key={index} src={src} alt={`image${index + 1}`} />
                    ))}
                </div>
                <div className="image-column image-column3">
                    {imagesColumn3.map((src, index) => (
                        <img key={index} src={src} alt={`image${index + 1}`} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Welcome;
