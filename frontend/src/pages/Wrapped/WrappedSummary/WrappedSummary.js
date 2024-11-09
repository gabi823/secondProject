import React from 'react';
import './WrappedSummary.css';
import {Link} from 'react-router-dom';

const WrappedSummary = ({ userData = {} }) => {
    const {
        title = "You’ve reached the end...",
        subtitle = "Here’s an overview of everything:",
        topArtist = { rank: 1, name: "Taylor Swift", image: "https://via.placeholder.com/231x232" },
        topSongs = [
            { title: "APT.", artist: "Rose, Bruno Mars" },
            { title: "I Love You, I’m Sorry", artist: "Gracie Abrams" },
            { title: "A Bar Song (Tipsy)", artist: "Shaboozey" },
            { title: "Pink Pony Club", artist: "Chappell Roan" },
            { title: "Guess featuring Billie Eilish", artist: "Charli XCX, Billie Eilish" }
        ],
        topGenres = ["Pop", "Indie Pop", "Rap", "K-Pop", "Rock"],
        topAlbums = [
            { title: "HIT ME HARD AND SOFT", artist: "Billie Eilish" },
            { title: "Short n’ Sweet", artist: "Sabrina Carpenter" },
            { title: "BRAT", artist: "Charli XCX" },
            { title: "The Rise and Fall of a Midwest Princess", artist: "Chappell Roan" },
            { title: "Eternal Sunshine", artist: "Ariana Grande" }
        ]
    } = userData;

    return (
        <>
        <div className="header">
            <h1 className="header-title"></h1>
            <Link to="/profile" className="exit-button" onClick={() => console.log("Exit clicked")}>&times;</Link>
        </div>

    <div className="login-background">
        <div className="login-image-row">
            {Array.from({length: 9}).map((_, index) => (
                <img
                    key={index}
                    src="https://via.placeholder.com/161x161"
                    alt={`Placeholder image ${index + 1}`}
                    className="login-image"
                />
            ))}
        </div>
        <div className="login-image-row">
            {Array.from({length: 9}).map((_, index) => (
                <img
                    key={index}
                    src="https://via.placeholder.com/161x161"
                    alt={`Placeholder image ${index + 1}`}
                    className="login-image"
                />
            ))}
        </div>
        <div className="login-image-row">
            {Array.from({length: 9}).map((_, index) => (
                <img
                    key={index + 9}
                    src="https://via.placeholder.com/161x161"
                    alt={`Placeholder image ${index + 10}`}
                    className="login-image"
                />
            ))}
        </div>
    </div>

            <div style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <div style={{
                    width: 659,
                    height: 728,
                    position: 'relative',
                    background: 'white',
                    borderRadius: 20,
                    border: '1px solid black',
                }}>
                    {/* Title and subtitle */}
                    <div style={{
                        width: 589,
                        height: 87,
                        left: 27,
                        top: 30,
                        position: 'absolute'
                    }}>
                        <h1 style={{
                            color: 'black',
                            fontSize: 38,
                            fontFamily: 'Manrope',
                            fontWeight: 700,
                            wordWrap: 'break-word',
                            lineHeight: 1.2,
                            margin: 0
                        }}>{title}</h1>
                        <h2 style={{
                            color: 'black',
                            fontSize: 18,
                            fontFamily: 'Manrope',
                            fontWeight: 500,
                            wordWrap: 'break-word',
                            margin: 0
                        }}>{subtitle}</h2>
                    </div>

                    {/* Top Artist Section */}
                    <div style={{
                        width: 231,
                        height: 232,
                        left: 391,
                        top: 130,
                        position: 'absolute',
                    }}>
                        <div style={{
                            width: 231,
                            height: 232,
                            background: '#D9D9D9',
                            borderRadius: '50%',
                            overflow: 'hidden'
                        }}>
                            <img src={topArtist.image} alt={topArtist.name}
                                 style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                        </div>
                    </div>
                    <div style={{
                        width: 172,
                        height: 28,
                        left: 421,
                        top: 370,
                        position: 'absolute',
                    }}>
                        <h3 style={{
                            color: 'black',
                            fontSize: 24,
                            fontFamily: 'Manrope',
                            fontWeight: 800,
                            display: 'inline'
                        }}>#{topArtist.rank}</h3>
                        <span style={{
                            color: 'black',
                            fontSize: 24,
                            fontFamily: 'Manrope',
                            fontWeight: 500
                        }}> {topArtist.name}</span>
                    </div>

                    {/* Sections for Top Songs, Genres, and Albums */}
                    <div style={{
                        width: 190,
                        height: 29,
                        left: 26,
                        top: 140,
                        position: 'absolute',
                        color: 'black',
                        fontSize: 24,
                        fontFamily: 'Manrope',
                        fontWeight: 700,
                        textDecoration: 'underline'
                    }}>Top Songs
                    </div>
                    <div style={{
                        width: 190,
                        height: 29,
                        left: 27,
                        top: 430,
                        position: 'absolute',
                        color: 'black',
                        fontSize: 24,
                        fontFamily: 'Manrope',
                        fontWeight: 700,
                        textDecoration: 'underline'
                    }}>Top Genres
                    </div>
                    <div style={{
                        width: 190,
                        height: 29,
                        left: 219,
                        top: 430,
                        position: 'absolute',
                        color: 'black',
                        fontSize: 24,
                        fontFamily: 'Manrope',
                        fontWeight: 700,
                        textDecoration: 'underline'
                    }}>Top Albums
                    </div>

                    {/* Dynamic lists for each category with inline formatting */}
                    <div style={{
                        width: 359,
                        height: 199,
                        left: 26,
                        top: 195,
                        position: 'absolute'
                    }}>
                        {topSongs.map((song, index) => (
                            <div key={index} style={{marginBottom: '10px'}}>
                            <span style={{
                                color: 'black',
                                fontSize: 20,
                                fontFamily: 'Manrope',
                                fontWeight: 700,
                            }}>{index + 1}. {song.title}</span>
                                <span style={{
                                    color: 'black',
                                    fontSize: 16,
                                    fontFamily: 'Manrope',
                                    fontWeight: 500,
                                    marginLeft: '8px'
                                }}>{song.artist}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        width: 170,
                        height: 164,
                        left: 26,
                        top: 480,
                        position: 'absolute'
                    }}>
                        {topGenres.map((genre, index) => (
                            <div key={index} style={{
                                color: 'black',
                                fontSize: 20,
                                fontFamily: 'Manrope',
                                fontWeight: 700,
                                marginBottom: '8px'
                            }}>{index + 1}. {genre}</div>
                        ))}
                    </div>

                    <div style={{
                        width: 411,
                        height: 205,
                        left: 217,
                        top: 480,
                        position: 'absolute'
                    }}>
                        {topAlbums.map((album, index) => (
                            <div key={index} style={{marginBottom: '10px'}}>
                            <span style={{
                                color: 'black',
                                fontSize: 20,
                                fontFamily: 'Manrope',
                                fontWeight: 700,
                            }}>{index + 1}. {album.title}</span>
                                <span style={{
                                    color: 'black',
                                    fontSize: 16,
                                    fontFamily: 'Manrope',
                                    fontWeight: 500,
                                    marginLeft: '8px'
                                }}>{album.artist}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <button style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    fontFamily: 'Manrope',
                    fontWeight: '400',
                    color: 'black',
                    border: 'solid',
                    borderWidth: 1,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    backgroundColor: 'white'
                }}
                >
                    Save to Profile
                </button>
            </div>
        </>
    );
}

export default WrappedSummary;
