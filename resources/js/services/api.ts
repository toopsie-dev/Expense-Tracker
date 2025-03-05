import axios from "axios";

interface WindowEnv {
    env: {
        API_BASE_URL: string;
    };
}

const API_BASE_URL = (window as unknown as WindowEnv).env.API_BASE_URL;

const api = axios.create({
    // baseURL: API_BASE_URL,
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
});

// Add CSRF token handling
api.interceptors.request.use(async (config) => {
    // Get CSRF cookie before request
    await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
    return config;
});

// api.interceptors.request.use(
//     (config) => {
//         const token = document
//             .querySelector('meta[name="csrf-token"]')
//             ?.getAttribute("content");
//         if (token) {
//             config.headers["X-CSRF-TOKEN"] = token;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default api;
