import axios from 'axios';

// Base URL of your Django backend API
const BASE_URL = 'http://localhost:8000/api';

// Function to get all records of Artist
export const artistData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/artist/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Function to create a new record in Artist
export const createArtistData = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/artist/`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating data:', error);
    throw error;
  }
};