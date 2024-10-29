import React from 'react';
import NavBarLoggedIn from "../../components/NavBarLoggedIn/NavBarLoggedIn";
import {Link} from "react-router-dom";
import Settings from "../Settings/Settings";

const Profile = () => {
    return (
        <>
            <NavBarLoggedIn />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: '60px', // Adds some space between the two containers
                padding: '20px',
                marginTop: '65px'
            }}>
                {/* Profile Container */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                    marginRight: '60px',
                }}>
                    {/* Circular Image Container */}
                    <div style={{
                        width: '180px', // Circle size
                        height: '180px',
                        background: 'white',
                        borderRadius: '50%', // Makes the div circular
                        overflow: 'hidden', // Ensures the image is cropped
                        border: '2px black solid',
                        marginBottom: '10px',
                    }}>
                        <img
                            src="https://via.placeholder.com/300" // Replace with your image source
                            alt="Profile"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover', // Crops the image to fill the circle
                                borderRadius: '50%', // Ensures the image itself is circular
                            }}
                        />
                    </div>
                    <div style={{
                        width: '204px',
                        height: '34px',
                        color: 'black',
                        fontSize: '22px', // Reduced font size
                        fontFamily: 'Manrope',
                        fontWeight: '400',
                        textDecoration: 'underline',
                        wordWrap: 'break-word',
                        textAlign: 'center',
                    }}>
                        your_username
                    </div>
                    <div style={{
                        width: '191px',
                        height: '21px',
                        color: 'black',
                        fontSize: '14px', // Reduced font size
                        fontFamily: 'Manrope',
                        fontWeight: '400',
                        textAlign: 'center',
                    }}>
                        youremail123@email.com
                    </div>

                    <div style={{
                        width: '220px',
                        height: '75px',
                        background: 'white',
                        borderRadius: '10px',
                        border: '1px black solid',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '10px',
                        gap: '15px',
                    }}>
                        <img style={{
                            width: '64px', // Reduced image size
                            height: '64px',
                            borderRadius: '5px',
                        }}
                            src="https://via.placeholder.com/64x64"
                            alt="Artist" />
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}>
                            <div style={{
                                color: 'black',
                                fontSize: '18px', // Slightly reduced size
                                fontFamily: 'Manrope',
                                fontWeight: '600',
                            }}>
                                Taste
                            </div>
                            <div style={{
                                color: 'black',
                                fontSize: '14px',
                                fontFamily: 'Manrope',
                                fontWeight: '400',
                            }}>
                                Sabrina Carpenter
                            </div>
                        </div>
                    </div>
                    <Link to="/settings">
                        <div style={{
                            width: '119px',
                            height: '38px',
                            background: 'white',
                            borderRadius: '10px',
                            border: '1px black solid',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <div style={{
                                color: 'black',
                                fontSize: '16px', // Reduced size
                                fontFamily: 'Manrope',
                                fontWeight: '600',
                                textAlign: 'center',
                                textDecoration: 'none'
                            }}>
                                Settings
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Wrapped Container */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    width: '700px',
                    padding: '15px',
                    borderRadius: '10px',
                    height: '500px', // Ensure it fits within the screen
                    overflowY: 'auto', // If content overflows, allow scrolling within this section
                    boxSizing: 'border-box',
                    overflowX: 'hidden',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px', // Reduced margin
                        width: '100%',
                        justifyContent: 'space-between'
                    }}>
                        <img style={{
                            width: '160px', // Reduced image size
                            height: '160px',
                        }}
                             src="https://via.placeholder.com/160x160"
                             alt="Wrapped Image"/>
                        <div style={{
                            textAlign: 'left',
                            color: 'black',
                            fontSize: '30px', // Reduced font size
                            fontFamily: 'Manrope',
                            fontWeight: '500',
                            marginLeft: '20px'
                        }}>
                            Your Wrapped #1<br/>
                            <span style={{
                                fontSize: '18px', // Reduced font size
                                fontWeight: '500',
                            }}>
                                Date Created: 2024-10-9
                            </span>
                        </div>
                        <img style={{
                            width: '28px', // Reduced icon size
                            height: '28px',
                        }}
                             src="https://via.placeholder.com/28x28"
                             alt="icon"/>
                    </div>

                    <hr style={{
                        width: '100%',
                        border: '0.5px solid black',
                        marginBottom: '20px'
                    }}/>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px', // Reduced margin
                        width: '100%',
                        justifyContent: 'space-between'
                    }}>
                        <img style={{
                            width: '160px', // Reduced image size
                            height: '160px',
                        }}
                             src="https://via.placeholder.com/160x160"
                             alt="Wrapped Image"/>
                        <div style={{
                            textAlign: 'left',
                            color: 'black',
                            fontSize: '30px', // Reduced font size
                            fontFamily: 'Manrope',
                            fontWeight: '500',
                            marginLeft: '20px'
                        }}>
                            Your Wrapped #2<br/>
                            <span style={{
                                fontSize: '18px', // Reduced font size
                                fontWeight: '500',
                            }}>
                                Date Created: 2024-10-10
                            </span>
                        </div>
                        <img style={{
                            width: '28px', // Reduced icon size
                            height: '28px',
                        }}
                             src="https://via.placeholder.com/28x28"
                             alt="icon"/>
                    </div>

                    <hr style={{
                        width: '100%',
                        border: '0.5px solid black',
                        marginBottom: '20px'
                    }}/>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px', // Reduced margin
                        width: '100%',
                        justifyContent: 'space-between'
                    }}>
                        <img style={{
                            width: '160px', // Reduced image size
                            height: '160px',
                        }}
                             src="https://via.placeholder.com/160x160"
                             alt="Wrapped Image"/>
                        <div style={{
                            textAlign: 'left',
                            color: 'black',
                            fontSize: '30px', // Reduced font size
                            fontFamily: 'Manrope',
                            fontWeight: '500',
                            marginLeft: '20px'
                        }}>
                            Your Wrapped #3<br/>
                            <span style={{
                                fontSize: '18px', // Reduced font size
                                fontWeight: '500',
                            }}>
                                Date Created: 2024-10-11
                            </span>
                        </div>
                        <img style={{
                            width: '28px', // Reduced icon size
                            height: '28px',
                        }}
                             src="https://via.placeholder.com/28x28"
                             alt="icon"/>
                    </div>

                    <hr style={{
                        width: '100%',
                        border: '0.5px solid black',
                        marginBottom: '20px'
                    }}/>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Link to="/selectionscreen" style={{
                            color: 'black',
                            fontSize: '30px', // Reduced font size
                            fontFamily: 'Manrope',
                            fontWeight: '500',
                            textDecoration: 'none'
                        }}>
                            Create New Wrapped
                        </Link>
                        <br></br>
                        <Link to="/selectionscreen" style={{
                            color: 'black',
                            fontSize: '50px', // Reduced font size
                            fontFamily: 'Manrope',
                            fontWeight: '700',
                            marginLeft: '15px',
                            textDecoration: 'none'
                        }}>
                            +
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
