import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar.js';
import './Welcome.css';
import axios from 'axios';

const Welcome = () => {
    const [images, setImages] = useState({
        column1: [],
        column2: [],
        column3: []
    });

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/fetch-playlist-images/');
                const fetchedImages = response.data.images;

                // Divide images into three columns for the grid
                const newImages = {
                    column1: fetchedImages.slice(0, 4),
                    column2: fetchedImages.slice(4, 9),
                    column3: fetchedImages.slice(9, 12)
                };

                setImages(newImages);

                // Log the images to check the state
                console.log("Fetched Images:", newImages);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);

    // Log images before rendering
    console.log("Current images state:", images);

    return (
        <>
            <NavBar />
            <div className="welcome-container">
                <div className="image-column image-column1">
                    {images.column1.map((src, index) => (
                        <img key={index} src={src} alt={`image${index + 1}`} className="carousel-image1" />
                    ))}
                </div>
                <div className="image-column image-column2">
                    {images.column2.map((src, index) => (
                        <img key={index} src={src} alt={`image${index + 1}`} className="carousel-image2" />
                    ))}
                </div>
                <div className="image-column image-column3">
                    {images.column3.map((src, index) => (
                        <img key={index} src={src} alt={`image${index + 1}`} className="carousel-image3" />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Welcome;
