import React from "react";
import { Link } from "react-router-dom";

const WrappedAlbums = () => {
    return (
        <>
            <div style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                right: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h1 style={{fontSize: "36px", fontWeight: "700", fontFamily: "Manrope", margin: "0"}}>Your Top Albums</h1>
                <Link
                    to="/profile"
                    style={{
                        fontSize: "28px",
                        position: "relative",
                        top: "-8px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textDecoration: "none",
                    }}
                    onClick={() => console.log("Exit clicked")}
                >
                    &times;
                </Link>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100vh',  // Full viewport height to allow vertical centering
                marginTop: '-270px',
            }}>
                <div style={{
                    position: 'relative',
                    width: '450px',  // Adjust width to fit the images
                    height: '600px',  // Adjust height as needed
                }}>
                    {[...Array(10)].map((_, index) => (
                        <img key={index}
                            style={{
                                width: 405,
                                height: 405,
                                position: 'absolute',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                top: `${200 + index * 25}px`, // adjust spacing between images
                                borderStyle: 'solid',
                                borderWidth: 2
                            }}
                            src="https://via.placeholder.com/405x405"
                            alt={`Album ${index + 1}`}
                        />
                    ))}

                    <div style={{
                        width: 267,
                        height: 33,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        top: '920px',
                        position: 'absolute',
                        textAlign: 'center',
                        color: 'black',
                        fontSize: 17,
                        fontFamily: 'Manrope',
                        fontWeight: '400',
                        wordWrap: 'break-word'
                    }}>Click to reveal more
                    </div>
                    <div style={{
                        width: 983,
                        height: 47,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        top: '860px',
                        position: 'absolute',
                        textAlign: 'center',
                        color: 'black',
                        fontSize: 40,
                        fontFamily: 'Manrope',
                        fontWeight: '1000',
                        wordWrap: 'break-word'
                    }}>10. Artist(s) - Album Name
                    </div>
                </div>
            </div>

            <Link
                to="/listening-personality"
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    fontSize: "36px",
                    textDecoration: "none",
                    color: "black",
                    cursor: "pointer"
                }}
                onClick={() => console.log("Next page clicked")}
            >
                &#8594;
            </Link>
        </>
    );
};

export default WrappedAlbums;
