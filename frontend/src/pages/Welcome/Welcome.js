import React from 'react';
import NavBar from '../../components/NavBar/NavBar.js';
import styles from './welcome.css'

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

const Welcome = () => {
    return (
        <>
            <NavBar/>
            <div style={{width: '100%', height: '100%', position: 'relative', zIndex: -1, display: 'flex', justifyContent: 'center', marginTop: '-325px', overflow: 'hidden'}}>
                <div style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '10px',
                    overflow:'hidden'
                }}>
                    {imagesColumn1.map((src, index) => (
                        <img key={index} style={{width: 308, height: 308}} src={src} alt={`image${index + 1}`}/>
                    ))}
                </div>
                <div style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '20px',  // Add gap between the images
                    padding: '10px',
                    overflow:'hidden'
                }}>
                    {imagesColumn2.map((src, index) => (
                        <img key={index} style={{width: 230, height: 231}} src={src} alt={`image${index + 1}`}/>
                    ))}
                </div>
                <div style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '20px',  // Add gap between the images
                    padding: '10px',
                    overflow:'hidden'
                }}>
                    {imagesColumn3.map((src, index) => (
                        <img key={index} style={{width: 307, height: 308}} src={src} alt={`image${index + 1}`}/>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Welcome;
