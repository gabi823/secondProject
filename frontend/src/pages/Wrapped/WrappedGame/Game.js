import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Game.css'; // Add custom styles for the updated design

const Game = () => {
    const [trackId, setTrackId] = useState(null);
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Making request to recent tracks');
                const response = await axios.get('http://localhost:8000/api/recent-tracks/', {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                    validateStatus: function (status) {
                        return status < 500; // Don't reject responses with status < 500
                    },
                });
                setTrackId(response.data.track_id);
                setOptions(response.data.options);
                setCorrectAnswer(response.data.correct_answer);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleGuess = (option) => {
        if (option === correctAnswer) {
            setMessage('Congratulations! You guessed correctly. Reload the page to play again.');
        } else {
            setMessage(`Good try! The correct answer was "${correctAnswer}". Reload the page to try again.`);
        }
    };

    return (
        <div className="game-container">
            {trackId ? (
                <>
                    <h1 className="game-title">Guess the Song</h1>
                    <div className="iframe-container">
                        <iframe
                            src={`https://open.spotify.com/embed/track/${trackId}`}
                            className="spotify-iframe"
                            frameBorder="0"
                            allow="encrypted-media"
                            title="Spotify Player"
                        ></iframe>
                    </div>
                    <div className="quiz-container">
                        <h2 className="quiz-prompt">Which song is also by this artist?</h2>
                        {options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleGuess(option)}
                                className="quiz-option"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    {message && <p className="game-message">{message}</p>}
                </>
            ) : (
                <p className="loading-message">Loading... Please wait.</p>
            )}
        </div>
    );
};

export default Game;
