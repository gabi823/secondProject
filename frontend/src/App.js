import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { fetchArtists } from './api';

function App() {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        fetchArtists()
            .then((response) => setArtists(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1>Spotify Wrapped Artists</h1>
            <ul>
                {artists.map((artist) => (
                    <li key={artist.id}>{artist.name} - {artist.genre}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
