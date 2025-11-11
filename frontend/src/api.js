import axios from "axios";

const hostname = window.location.hostname;
const isLocal = hostname === "localhost" || hostname === "127.0.0.1";

const API = axios.create({
  baseURL: isLocal
    ? "http://localhost:5000/api"
    : "https://fakestoreapi.com", 
});

export default API;
