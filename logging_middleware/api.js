import { AFFORDMED_CONFIG } from '../notification_app_fe/src/config/affordmedConfig';

// Determine backend vs proxy route path
const getLogEndpoint = () => {
  const baseUrl = AFFORDMED_CONFIG.BASE_URL;
  // If we are running in a browser environment on localhost and the baseURL is the default remote host,
  // route logs through the local proxy to avoid CORS/duplicate-header errors.
  if (
    typeof window !== 'undefined' && 
    window.location.hostname === 'localhost' && 
    baseUrl.startsWith('http://4.224.186.213')
  ) {
    return '/evaluation-service/logs';
  }
  return `${baseUrl}/logs`;
};

// Dispatch remote log payload using fetch API
export const sendLogRequest = async (logData) => {
  const token = AFFORDMED_CONFIG.ACCESS_TOKEN;

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token && token !== 'REPLACE_ACCESS_TOKEN') {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const endpoint = getLogEndpoint();

  return fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(logData),
  });
};

export default sendLogRequest;
