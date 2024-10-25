import './App.css';
import React, { useEffect, useState } from 'react';
import { fetchArtists } from './api';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import profilePage from './pages/profilePage';
import selectionScreen from './pages/selectionScreen';
import Welcome from './pages/Welcome';
import wrappedSongs from './pages/wrappedSongs';
import wrappedWelcome from './pages/wrappedWelcome';

function App() {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        fetchArtists()
            .then((response) => setArtists(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <Router>
            <div>
                <h1>Spotify Wrapped Artists</h1>
                <ul>
                    {artists.map((artist) => (
                        <li key={artist.id}>{artist.name} - {artist.genre}</li>
                    ))}
                </ul>

                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/profile" element={<profilePage />} />
                    <Route path="/selection" element={<selectionScreen />} />
                    <Route path="/wrapped-songs" element={<wrappedSongs />} />
                    <Route path="/wrapped-welcome" element={<wrappedWelcome />} />
</Routes>
            </div>
        </Router>
    );
}

export default App;
