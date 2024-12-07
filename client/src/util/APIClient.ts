const baseURL = import.meta.env.VITE_API_BASE_URL;
const prefix = import.meta.env.VITE_API_PRFIX;

console.log("Base URL:", baseURL);
console.log("Prefix  :", prefix);

import axios from "axios";

const APIClient = axios.create({
    baseURL: baseURL,
});

export default APIClient;
