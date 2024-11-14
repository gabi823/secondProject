// Welcome.js
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
                    column1: fetchedImages.slice(0, 30),
                    column2: fetchedImages.slice(30, 70),
                    column3: fetchedImages.slice(70, 100)
                };

                setImages(newImages);

            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);

    return (
        <>
            <NavBar />
            <div className="welcome-container">
                <div className="image-column image-column1">
                    <div className="image-column-inner">
                        {images.column1.map((src, index) => (
                            <img key={`col1-${index}`} src={src} alt={`image${index + 1}`} className="carousel-image1" />
                        ))}
                    </div>
                </div>
                <div className="image-column image-column2">
                    <div className="image-column-inner">
                        {images.column2.map((src, index) => (
                            <img key={`col2-${index}`} src={src} alt={`image${index + 1}`} className="carousel-image2" />
                        ))}
                    </div>
                </div>
                <div className="image-column image-column3">
                    <div className="image-column-inner">
                        {images.column3.map((src, index) => (
                            <img key={`col3-${index}`} src={src} alt={`image${index + 1}`} className="carousel-image3" />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Welcome;
