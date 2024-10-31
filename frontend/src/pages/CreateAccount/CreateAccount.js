import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import {Link} from "react-router-dom";

const CreateAccount = () => {
    return (
        <>
            <NavBar/>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: '-1',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 28,
                    marginTop: 170,
                }}>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 1"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 2"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 3"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 4"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 5"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 6"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 7"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 8"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 9"/>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 28,
                    marginTop: 230,
                }}>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 9"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 10"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 11"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 12"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 13"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 14"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 15"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 16"/>
                    <img style={{width: 161, height: 161}} src="https://via.placeholder.com/161x161"
                         alt="Placeholder image 17"/>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    marginTop: 175,
                }}
            >
                <div
                    style={{
                        width: 400,
                        padding: '60px 85px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        background: 'white',
                        borderRadius: 20,
                        border: '1px solid black',
                    }}
                >
                    <div
                        style={{
                            color: 'black',
                            fontSize: 24,
                            fontFamily: 'Manrope',
                            fontWeight: '600',
                            textAlign: 'center',
                            marginBottom: '20px',
                        }}
                    >
                        Create Account
                    </div>
                    <div
                        style={{
                            fontSize: 18,
                            fontFamily: 'Manrope',
                            fontWeight: '500',
                            color: 'black',
                            alignSelf: 'flex-start',
                            marginBottom: '5px',
                        }}
                    >
                        Username:
                    </div>
                    <input
                        type="text"
                        style={{
                            width: '100%',
                            height: '30px',
                            fontSize: '18px',
                            border: 'none',
                            borderBottom: '1px solid #000',
                            outline: 'none',
                            marginBottom: '20px',
                            fontFamily: 'Manrope',
                        }}
                    />
                    <div
                        style={{
                            fontSize: 18,
                            fontFamily: 'Manrope',
                            fontWeight: '500',
                            color: 'black',
                            alignSelf: 'flex-start',
                            marginBottom: '5px',
                        }}
                    >
                        Password:
                    </div>
                    <input
                        type="password"
                        style={{
                            width: '100%',
                            height: '30px',
                            fontSize: '18px',
                            border: 'none',
                            borderBottom: '1px solid #000',
                            outline: 'none',
                            marginBottom: '20px',
                            fontFamily: 'Manrope',
                        }}
                    />
                    <div
                        style={{
                            fontSize: 18,
                            fontFamily: 'Manrope',
                            fontWeight: '500',
                            color: 'black',
                            alignSelf: 'flex-start',
                            marginBottom: '5px',
                        }}
                    >
                        Email:
                    </div>
                    <input
                        type="password"
                        style={{
                            width: '100%',
                            height: '30px',
                            fontSize: '18px',
                            border: 'none',
                            borderBottom: '1px solid #000',
                            outline: 'none',
                            marginBottom: '40px',
                            fontFamily: 'Manrope',
                        }}
                    />
                    <button
                        style={{
                            width: '60%',
                            height: '40px',
                            background: 'white',
                            borderRadius: 5,
                            border: '1px solid #000',
                            fontSize: 18,
                            fontFamily: 'Manrope',
                            fontWeight: '600',
                            color: 'black',
                            cursor: 'pointer',
                            transition: 'background 0.3s',
                        }}
                        onMouseEnter={(e) => (e.target.style.background = '#f0f0f0')}
                        onMouseLeave={(e) => (e.target.style.background = 'white')}
                    >
                        Create Account
                    </button>
                </div>
            </div>
        </>
    );
};

export default CreateAccount;