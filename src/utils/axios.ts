import axios from 'axios';

const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_PEXELS_API_URL;


const pexelsApiV1 = axios.create({
    baseURL: `${API_URL}/v1`,
    headers: {
      Authorization: PEXELS_API_KEY,
    },
});

export { pexelsApiV1 }; 
