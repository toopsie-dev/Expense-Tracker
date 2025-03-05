import axios from "axios";

interface WindowEnv {
    env: {
        API_BASE_URL: string;
    };
}

const API_BASE_URL = (window as unknown as WindowEnv).env.API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
});

// Get CSRF token from cookie
function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
}

// Fetch CSRF token before operations that need it
const fetchCsrfToken = async () => {
    try {
        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
            withCredentials: true,
        });
        return true;
    } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
        return false;
    }
};

// Add request interceptor to include CSRF token
api.interceptors.request.use(
    async (config) => {
        // Only fetch CSRF token for non-GET requests
        if (config.method !== "get") {
            await fetchCsrfToken();

            // Get CSRF token from cookie after fetching
            const token = getCookie("XSRF-TOKEN");

            if (token) {
                // Laravel expects the token in X-XSRF-TOKEN header (decoded)
                config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for debugging
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error(
            "API Error:",
            error.response?.status,
            error.response?.data
        );
        return Promise.reject(error);
    }
);

export default api;
