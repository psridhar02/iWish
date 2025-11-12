import axios from "axios";

// 1. Get the Backend URL from environment variables
// This will be 'https://iwish-backend.onrender.com' in the production build.
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// FakeStore API (For product listings - baseURL is static)
const API = axios.create({
  baseURL: "https://fakestoreapi.com",
});

// Backend API (For Wishlist/Forum - baseURL is dynamic)
export const BackendAPI = axios.create({
  baseURL: BACKEND_BASE_URL,
});

export default API;
