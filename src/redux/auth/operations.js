import serviceApi, { removeAuthHeader } from '../../services/api';
import { createThunk } from '../createThunk';

export const register = createThunk('auth/register', async (body) => {
  return serviceApi.auth.signup(body);
});

export const login = createThunk('auth/login', async (body) => {
  return serviceApi.auth.login(body);
});

export const logout = createThunk('auth/logout', async () => {
  const response = await serviceApi.auth.logout();
  removeAuthHeader();
  return response.data || { success: true };
});

export const refreshUser = createThunk('auth/refresh', async () => {
  try {
    const response = await serviceApi.auth.refresh();
    return response.data;
  } catch (error) {
    removeAuthHeader();
    throw error;
  }
});