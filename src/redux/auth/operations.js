import contactsApi from '../../services/api';
import { createThunk } from '../contacts/operations';

export const register = createThunk('auth/register', async (body) =>
  contactsApi.auth.signup(body)
);

export const login = createThunk('auth/login', async (body) =>
  contactsApi.auth.login(body)
);

export const logout = createThunk('auth/logout', async () =>
  contactsApi.auth.logout()
);

export const refreshUser = createThunk('auth/refresh', async (_, thunkAPI) => {
  const savedToken = thunkAPI.getState().auth.token;
  if (!savedToken) {
    console.log('User is not logged in!');
    throw new Error('Token is not exist!');
  }

  return contactsApi.auth.refresh({ token: savedToken });
});
