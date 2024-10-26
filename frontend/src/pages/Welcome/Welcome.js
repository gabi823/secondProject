import React from 'react';
import NavBar from '../../components/NavBar/NavBar.js';

const Welcome = () => {
    return (
        <>
            <NavBar />
            {/* Outer Wrapper to Center Content */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
            }}>
                {/* Inner Wrapper to Group Images */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                    textAlign: 'center',
                    zIndex: -1,
                }}>
                    <img style={{width: 308, height: 308, left: 273, top: -25, position: 'absolute'}}
                         src="https://via.placeholder.com/308x308" alt="image1"/>
                    <img style={{width: 306.67, height: 308, left: 273, top: 303, position: 'absolute'}}
                         src="https://via.placeholder.com/307x308" alt="image2"/>
                    <img style={{width: 306.67, height: 308, left: 273, top: 631, position: 'absolute'}}
                         src="https://via.placeholder.com/307x308" alt="image3"/>
                    <img style={{width: 306.67, height: 308, left: 273, top: 959, position: 'absolute'}}
                         src="https://via.placeholder.com/307x308" alt="image4"/>
                    <img style={{width: 230, height: 231, left: 604, top: 168, position: 'absolute'}}
                         src="https://via.placeholder.com/230x231" alt="image5"/>
                    <img style={{width: 230, height: 231, left: 604, top: -82, position: 'absolute'}}
                         src="https://via.placeholder.com/230x231" alt="image6"/>
                    <img style={{width: 308, height: 301.16, left: 859, top: 748, position: 'absolute'}}
                         src="https://via.placeholder.com/308x301" alt="image7"/>
                    <img style={{width: 230, height: 231, left: 604, top: 418, position: 'absolute'}}
                         src="https://via.placeholder.com/230x231" alt="image8"/>
                    <img style={{width: 230, height: 231, left: 604, top: 668, position: 'absolute'}}
                         src="https://via.placeholder.com/230x231" alt="image9"/>
                    <img style={{width: 230, height: 231, left: 604, top: 918, position: 'absolute'}}
                         src="https://via.placeholder.com/230x231" alt="image10"/>
                    <img style={{width: 306.67, height: 308, left: 859, top: 418, position: 'absolute'}}
                         src="https://via.placeholder.com/307x308" alt="image11"/>
                    <img style={{width: 306.67, height: 308, left: 859, top: 83, position: 'absolute'}}
                         src="https://via.placeholder.com/307x308" alt="image12"/>
                    <img style={{width: 307, height: 308, left: 859, top: -244, position: 'absolute'}}
                         src="https://via.placeholder.com/307x308" alt="image13"/>

            </div>
        </div>
</>
)
    ;
};

export default Welcome;
