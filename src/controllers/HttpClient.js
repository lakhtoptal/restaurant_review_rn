import axios from 'axios';
import { strings } from '@/localization';
import { store } from '@/state/store';

const API_URL = 'https://restaurant-reviews-react-app.herokuapp.com';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((req) => {
  if (store.getState().user.loggedInUser) {
    const token = store.getState().user.loggedInUser.token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
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
