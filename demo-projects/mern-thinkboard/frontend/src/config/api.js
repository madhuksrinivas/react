// Base URL read from Vite environment variable.
// Set VITE_API_BASE_URL in .env file for local development and production.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const NOTES_API_URL = `${API_BASE_URL}/api/notes`;
