import axios from 'axios';

const API_URL = 'http://localhost:8000/api/artists/'; // Update the URL as needed

export const fetchArtists = () => {
    return axios.get(API_URL);
};
