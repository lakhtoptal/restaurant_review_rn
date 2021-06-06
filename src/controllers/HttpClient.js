import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import { strings } from '@/localization';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject(new Error(strings.common.connectionError));
    } else {
      return Promise.reject(error);
    }
  }
);

const setAuthorization = (token) => {
  client.defaults.headers.Authorization = `Bearer ${token}`;
};

const clearAuthorization = () => {
  delete client.defaults.headers.Authorization;
};

export const HttpClient = { ...client, setAuthorization, clearAuthorization };
