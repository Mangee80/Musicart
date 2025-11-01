// API Configuration
// Automatically uses production when built for production, local for development
// You can override by setting REACT_APP_API_MODE in .env file

// Check if we're in production build
const isProduction = process.env.NODE_ENV === 'production';

// Check for manual override via environment variable
const envMode = process.env.REACT_APP_API_MODE;

// Priority: 1. Env variable 2. Production build 3. Local default
const API_MODE = envMode || (isProduction ? 'production' : 'local');

const API_CONFIG = {
  local: {
    baseURL: 'http://localhost:5000'
  },
  production: {
    baseURL: 'https://musicart-9bam.vercel.app'
  }
};

const currentConfig = API_CONFIG[API_MODE] || API_CONFIG.local;

console.log(`🌐 API Mode: ${API_MODE} | Base URL: ${currentConfig.baseURL}`);

export const API_BASE_URL = currentConfig.baseURL;
export default API_BASE_URL;

