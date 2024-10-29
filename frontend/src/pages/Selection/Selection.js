import React from 'react';
import NavBarLoggedIn from "../../components/NavBarLoggedIn/NavBarLoggedIn";
import { Link } from "react-router-dom";

const Selection = () => {
    return (
        <>
            <NavBarLoggedIn />
            <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white' }}>
                {/* Main container in row direction */}
                <div style={{ display: 'flex', flexDirection: 'row', gap: '100px' }}>

                    {/* Selection container on the left */}
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', width: '775px', marginTop: '220px' }}>
                        <div style={{ color: 'black', fontSize: 64, fontFamily: 'Manrope', fontWeight: '700', wordWrap: 'break-word', marginBottom: '50px' }}>
                            Let’s look back, shall we?
                        </div>

                        {/* Name Your Wrapped and Line Input Field */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '45px' }}>
                            <div style={{ color: 'black', fontSize: 32, fontFamily: 'Manrope', fontWeight: '600', wordWrap: 'break-word' }}>
                                Name Your Wrapped:
                            </div>
                            <input
                                type="text"
                                placeholder="Enter a name"
                                style={{
                                    flex: 1,
                                    height: 40,
                                    fontSize: 24,
                                    fontFamily: 'Manrope',
                                    fontWeight: '800',
                                    border: 'none',
                                    borderBottom: '2px solid black',
                                    outline: 'none',
                                    paddingLeft: '10px',
                                    background: 'none'
                                }}
                            />
                        </div>

                        <div style={{display: 'flex', gap: '20px', marginTop: '20px'}}>
                            {/* Dropdown for Select Time Period */}
                            <div style={{
                                position: 'relative',
                                flex: 1,
                                height: 62,
                                border: '1px solid black',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                paddingLeft: '10px'
                            }}>
                                <select
                                    style={{
                                        flex: 1,
                                        height: '100%',
                                        fontSize: 24,
                                        fontFamily: 'Manrope',
                                        fontWeight: '600',
                                        color: 'black',
                                        border: 'none',
                                        outline: 'none',
                                        appearance: 'none',
                                        backgroundColor: 'transparent',
                                        paddingRight: '30px', // Adds space for the arrow
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="" disabled selected>Select time period</option>
                                    <option value="short">Short Term</option>
                                    <option value="medium">Medium Term</option>
                                    <option value="long">Long Term</option>
                                </select>

                                {/* Down Arrow */}
                                <span style={{
                                    position: 'absolute',
                                    right: '10px',
                                    pointerEvents: 'none', // Allows click through to select
                                    fontSize: 24,
                                    color: 'black'
                                }}>▼</span>
                            </div>


                            <div style={{
                                flex: 1,
                                height: 62,
                                background: 'white',
                                borderRadius: 10,
                                border: '1px black solid',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer'
                            }}>
                                <span style={{
                                    color: 'black',
                                    fontSize: 24,
                                    fontFamily: 'Manrope',
                                    fontWeight: '600'
                                }}>Go</span>
                            </div>
                        </div>
                    </div>

                    {/* Column container for images on the right */}
                    <div style={{display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '-200px'}}>
                        <img style={{width: 230, height: 231}} src="https://via.placeholder.com/230x231"
                             alt="placeholder"/>
                        <img style={{width: 230, height: 231}} src="https://via.placeholder.com/230x231"
                             alt="placeholder"/>
                        <img style={{width: 230, height: 231}} src="https://via.placeholder.com/230x231"
                             alt="placeholder"/>
                        <img style={{width: 230, height: 231}} src="https://via.placeholder.com/230x231"
                             alt="placeholder"/>
                        <img style={{width: 230, height: 231}} src="https://via.placeholder.com/230x231"
                             alt="placeholder"/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Selection;
