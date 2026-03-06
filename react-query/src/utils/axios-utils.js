import axios from "axios";

/**
 * Create a pre-configured axios instance
 * Benefits:
 * - Centralized base URL configuration
 * - Default headers applied to all requests
 * - Easy to switch between dev/prod environments
 */
const client = axios.create({
    baseURL: "http://localhost:4000", // Base URL for all API requests
    headers: {
        "Content-Type": "application/json", // Default content type for all requests
    },
});

/**
 * Custom request wrapper function
 * Handles all HTTP requests with:
 * - Automatic authorization token injection
 * - Response data extraction
 * - Centralized error handling
 * 
 * @param {Object} options - Axios request options (url, method, data, etc.)
 * @returns {Promise} - Resolves with response.data, rejects with error
 * 
 * @example
 * // GET request
 * const heroes = await request({ url: '/superheroes' });
 * 
 * @example
 * // POST request
 * const newHero = await request({
 *   url: '/superheroes',
 *   method: 'POST',
 *   data: { name: 'Iron Man', alterEgo: 'Tony Stark' }
 * });
 */
export const request = async ({ ...options }) => {
    // Dynamically add authorization token to every request
    // Gets latest token from localStorage (useful after login/logout)
    // Format: "Bearer <token>" (standard JWT format)
    client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`;
    
    // Success handler: Extract only the data portion from axios response
    // Axios response structure: { data, status, statusText, headers, config, request }
    // This returns only the "data" part, simplifying usage in components
    const onSuccess = response => response.data;
    
    // Error handler: Log error details and re-throw for React Query
    const onError = error => {
        // Log the request configuration that failed (URL, method, headers, etc.)
        console.error("Request Failed:", error.config);
        
        // If server responded with an error (4xx, 5xx status codes)
        if (error.response) {
            console.error("Status:", error.response.status);     // e.g., 404, 500
            console.error("Data:", error.response.data);         // Error message from server
        }
        // Note: If error.response doesn't exist, it's a network error (no internet, CORS, etc.)
        
        // Re-throw error so React Query can catch it and update query state
        // Without this, React Query wouldn't know the request failed
        throw error;
    };
    
    // Make the HTTP request using the configured client
    // Flow: client(options) → .then(onSuccess) → .catch(onError)
    // Returns: Just the data on success, throws error on failure
    return client(options).then(onSuccess).catch(onError);
}

/*
 * USAGE EXAMPLES:
 * 
 * 1. Simple GET request:
 *    const heroes = await request({ url: '/superheroes' });
 *    // Returns: [{ id: 1, name: "Batman" }, ...]
 * 
 * 2. POST request:
 *    const newHero = await request({
 *      url: '/superheroes',
 *      method: 'POST',
 *      data: { name: "Spider-Man", alterEgo: "Peter Parker" }
 *    });
 *    // Returns: { id: 5, name: "Spider-Man", alterEgo: "Peter Parker" }
 * 
 * 3. With React Query:
 *    const fetchHeroes = () => request({ url: '/superheroes' });
 *    const { data } = useQuery({ queryKey: ['heroes'], queryFn: fetchHeroes });
 *    // data will be the heroes array directly (no need for data.data)
 * 
 * IMPORTANT: Since onSuccess returns response.data, you should NEVER access .data again:
 *    ❌ const response = await request({ url: '/superheroes' });
 *       return response.data; // undefined!
 *    
 *    ✅ const response = await request({ url: '/superheroes' });
 *       return response; // Correct - already contains the data array
 */