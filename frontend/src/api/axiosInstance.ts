import axios from 'axios';

// Create an Axios instance with the base URL of your backend API
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach the token to every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle token expiration and other errors
axiosInstance.interceptors.response.use(
    (response) => response, // Simply return the response if it's successful
    async (error) => {
        const originalRequest = error.config;

        // Check if it's a 401 Unauthorized error (invalid or expired token)
        if (error.response && (error.response.status === 401 || error.response.status === 403 )) {
            // Clear the token and refresh token from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');

            // Redirect the user to the login page
            window.location.href = '/login?next=' + window.location.pathname; // Redirect with current URL

            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
