import axios from 'axios';
import { AFFORDMED_CONFIG } from '../config/affordmedConfig';

// Determine the base URL dynamically:
// Use the configuration base URL. If it's the default remote URL and we are running in localhost/dev,
// fallback to '/evaluation-service' to let Vite's proxy prevent CORS/duplicate-header errors.
const getBaseURL = () => {
  const configuredBaseUrl = AFFORDMED_CONFIG.BASE_URL;
  if (
    typeof window !== 'undefined' &&
    window.location.hostname === 'localhost' &&
    configuredBaseUrl.startsWith('http://4.224.186.213')
  ) {
    return '/evaluation-service';
  }
  return configuredBaseUrl;
};

const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Interceptor to inject authentication token
apiClient.interceptors.request.use(
  (config) => {
    const token = AFFORDMED_CONFIG.ACCESS_TOKEN;
    if (token && token !== 'REPLACE_ACCESS_TOKEN') {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
