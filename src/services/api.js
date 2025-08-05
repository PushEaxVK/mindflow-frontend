import axios from 'axios';
import { store } from '../redux/store';
import { refreshUser } from '../redux/auth/operations';
import { clearAuth } from '../redux/auth/slice';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://mindflow-backend-iwk7.onrender.com';

// Default axios configuration
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

const transformAuthResponse = (backendData) => ({
  user: backendData.user,
  accessToken: backendData.accessToken,
});

export const signup = async ({ name, email, password }) => {
  const response = await axios.post('/auth/register', {
    name,
    email,
    password,
  });
  const transformedData = transformAuthResponse(response.data.data);
  setAuthHeader(transformedData.accessToken);
  return { data: transformedData };
};

export const login = async ({ email, password }) => {
  const response = await axios.post('/auth/login', { email, password });
  const transformedData = transformAuthResponse(response.data.data);
  setAuthHeader(transformedData.accessToken);
  return { data: transformedData };
};

export const logout = async () => {
  const response = await axios.post('/auth/logout');
  removeAuthHeader();
  return response;
};

export const refresh = async () => {
  const response = await axios.post('/auth/refresh');
  const responseData = response.data?.data || response.data;
  if (responseData?.accessToken) {
    const transformedData = transformAuthResponse(responseData);
    setAuthHeader(transformedData.accessToken);
    return { data: transformedData };
  } else {
    throw new Error('Missing access token in refresh response');
  }
};

const serviceApi = {
  auth: { signup, login, logout, refresh },
};

export default serviceApi;

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

axios.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axios(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        await store.dispatch(refreshUser()).unwrap();
        const state = store.getState();
        const newToken = state.auth.accessToken;

        if (newToken) {
          onRefreshed(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        store.dispatch(clearAuth());
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
