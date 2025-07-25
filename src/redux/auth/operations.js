import serviceApi from '../../services/api';
import { createThunk } from '../createThunk';

export const register = createThunk('auth/register', async (body) =>
  serviceApi.auth.signup(body)
);

export const login = createThunk('auth/login', async (body) =>
  serviceApi.auth.login(body)
);

export const logout = createThunk('auth/logout', async () =>
  serviceApi.auth.logout()
);

export const refreshUser = createThunk('auth/refresh', async (_, thunkAPI) => {
  const savedToken = thunkAPI.getState().auth.token;
  if (!savedToken) {
    console.log('User is not logged in!');
    throw new Error('Token is not exist!');
  }

  return serviceApi.auth.refresh({ token: savedToken });
});
