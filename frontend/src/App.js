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

}

export default App;
