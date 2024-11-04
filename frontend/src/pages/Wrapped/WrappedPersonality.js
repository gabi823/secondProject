import React from "react";
import { Link } from "react-router-dom";

const WrappedPersonality = () => {
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
                <h1 style={{fontSize: "36px", fontWeight: "700", fontFamily: "Manrope", margin: "0"}}>Your Listening Personality</h1>
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

export default WrappedPersonality;