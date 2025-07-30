import { createAsyncThunk } from '@reduxjs/toolkit';
import serviceApi from '../../services/api';
import { createThunk } from '../createThunk';

export const register = createThunk('auth/register', async (body) =>
  serviceApi.auth.signup(body)
);

export const login = createThunk('auth/login', async (body) =>
  serviceApi.auth.login(body)
);
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await serviceApi.auth.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createThunk('auth/refresh', async (_, thunkAPI) => {
  const savedToken = thunkAPI.getState().auth.token;
  if (!savedToken) {
    console.log('User is not logged in!');
    throw new Error('Token is not exist!');
  }

  return serviceApi.auth.refresh({ token: savedToken });
});
