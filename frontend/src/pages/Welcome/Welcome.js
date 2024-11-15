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
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/fetch-playlist-images/');
                const fetchedImages = response.data.images;

                // Divide images into three columns for the grid and duplicate them for smooth scrolling
                const column1Images = fetchedImages.slice(0, 30);
                const column2Images = fetchedImages.slice(30, 70);
                const column3Images = fetchedImages.slice(70, 100);

                const newImages = {
                    column1: [...column1Images, ...column1Images],
                    column2: [...column2Images, ...column2Images],
                    column3: [...column3Images, ...column3Images],
                };

                setImages(newImages);
                setImagesLoaded(true); // Only set to true after images are fetched and set
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);

    return (
        <>
            <NavBar />
            {imagesLoaded ? (
                <div className="welcome-container">
                    <div className="image-column-left image-column1">
                        {images.column1.map((src, index) => (
                            <img key={index} src={src} alt={`image${index + 1}`} className="carousel-image1" />
                        ))}
                    </div>
                    <div className="image-column-middle image-column2">
                        {images.column2.map((src, index) => (
                            <img key={index} src={src} alt={`image${index + 1}`} className="carousel-image2" />
                        ))}
                    </div>
                    <div className="image-column-right image-column3">
                        {images.column3.map((src, index) => (
                            <img key={index} src={src} alt={`image${index + 1}`} className="carousel-image3" />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="loading-message">loading...</div> // Display a loading message until images are loaded
            )}
        </>
    );
};

export default Welcome;
