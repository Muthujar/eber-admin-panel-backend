const axios = require('axios');
const { API_BASE_URL } = require('./constants');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Attach API key to all requests
apiClient.interceptors.request.use((config) => {
  const apiKey = process.env.API_KEY;
  if (apiKey) {
    // const encodedKey = Buffer.from(apiKey).toString('base64');
    const encodedKey = btoa(apiKey);
    config.headers.Authorization = `Basic ${encodedKey}`;
  }
  return config;
}, (error) => Promise.reject(error));

module.exports = apiClient;
