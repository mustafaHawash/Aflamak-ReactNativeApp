import axios from "axios";

const API_KEY = "33b82fbdd608b9adb9818d5ca1cb61eb"; 

//  Base URL for TMDB API
const BASE_URL = "https://api.themoviedb.org/3";

//  Base URL for movie images (poster, backdrop, etc.)
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

/**
 *  Get popular movies
 * @param {number} page - The page number (default = 1)
 * @returns {Promise<object>} The API response containing movies data
 */
export const getPopularMovies = async (page = 1) => {
    try {
        const res = await axios.get(`${BASE_URL}/movie/popular`, {
            params: {
                api_key: API_KEY, // Required for authentication
                language: "en-US", // Language of the results
                page, // Page number for pagination
            },
        });

        // Return the full data object (includes results array)
        return res.data;
    } catch (err) {
        console.error("❌ Error fetching popular movies:", err);
        throw err;
    }
};

/**
 * Get details for a specific movie by its ID
 * @param {number} id - Movie ID
 * @returns {Promise<object>} The movie details
 */
export const getMovieDetails = async (id) => {
    try {
        const res = await axios.get(`${BASE_URL}/movie/${id}`, {
            params: {
                api_key: API_KEY, // Required for authentication
                language: "en-US",
            },
        });

        // Return movie details (title, overview, rating, etc.)
        return res.data;
    } catch (err) {
        console.error("❌ Error fetching movie details:", err);
        throw err;
    }
};

/**
 * Build full image URL for movie posters
 * @param {string} path - Poster path from TMDB response
 * @returns {string|null} Full URL of the image or null if no path
 */
export const getPoster = (path) => (path ? IMAGE_BASE + path : null);



