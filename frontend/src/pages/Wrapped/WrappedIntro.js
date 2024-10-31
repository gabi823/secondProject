import React from 'react';

const WrappedIntro = () => {
    return (
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
            {/* Exit Button */}
            <button
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    fontSize: '28px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                }}
                onClick={() => console.log('Exit clicked')}
            >
                &times;
            </button>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 28,
                marginTop: 10,
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

            {/* Centered Text and Button in Horizontal Row */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '40px',
                    marginTop: '100px',
                    marginBottom: 0
                }}
            >
                <div
                    style={{
                        color: 'black',
                        fontSize: '34px',
                        fontFamily: 'Manrope',
                        fontWeight: 1000,
                        textAlign: 'left'
                    }}
                >
                    Seems like you’ve been busy...
                    <div
                        style={{
                            color: 'black',
                            fontSize: '18px',
                            fontFamily: 'Manrope',
                            fontWeight: 500,
                            marginTop: 0
                        }}
                    >
                        Let’s see what you’ve been up to!
                    </div>
                </div>
                <button
                    style={{
                        fontSize: '28px',
                        fontFamily: 'Manrope',
                        fontWeight: 600,
                        padding: '15px 90px',
                        borderRadius: '20px',
                        border: '1px solid black',
                        background: 'transparent',
                        cursor: 'pointer'
                    }}
                >
                    Begin
                </button>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 28,
                marginTop: 100,
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
        </div>
    );
};

export default WrappedIntro;
