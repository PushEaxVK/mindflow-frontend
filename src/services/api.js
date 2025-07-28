import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeAuthHeader = () => {
  axios.defaults.headers.common.Authorization = ``;
};

// Auth API

export const signup = async ({ name, email, password }) => {
  const response = await axios.post('/auth/register', {
    name,
    email,
    password,
  });
  setAuthHeader(response.data.token);
  return response;
};

export const login = async ({ email, password }) => {
  const response = await axios.post('/auth/login', { email, password });
  setAuthHeader(response.data.token);
  return response;
};

export const logout = async () => {
  const response = await axios.post('/auth/logout');
  removeAuthHeader();
  return response;
};

export const refresh = async ({ token }) => {
  setAuthHeader(token);
  return await axios.get('/auth/refresh');
};

const serviceApi = {
  auth: {
    signup,
    login,
    logout,
    refresh,
  },
};

export default serviceApi;
