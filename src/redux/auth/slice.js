import { createSlice } from '@reduxjs/toolkit';
import { login, logout, refreshUser, register } from './operations';
import toast from 'react-hot-toast';
import { setAuthHeader, removeAuthHeader } from '../../services/api.js';

const initialState = {
  user: {
    id: null,
    name: null,
    email: null,
    avatarUrl: null,
    savedArticles: [],
    articlesAmount: 0,
    role: 'user',
  },
  accessToken: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const cleanUser = (user) => {
  if (!user) return initialState.user;
  return {
    id: user._id || null,
    name: user.name || null,
    email: user.email || null,
    avatarUrl: user.avatarUrl || null,
    savedArticles: user.savedArticles || [],
    articlesAmount: user.articlesAmount || 0,
    role: user.role || 'user',
  };
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: () => {
      removeAuthHeader();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = cleanUser(action.payload.user);
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;

        setAuthHeader(action.payload.accessToken);
        toast.success('Registration complete! You are now logged in.');
      })
      .addCase(register.rejected, (state, action) => {
        toast.error(action.payload || 'Registration failed');
      })

      .addCase(login.fulfilled, (state, action) => {
        state.user = cleanUser(action.payload.user);
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;

        setAuthHeader(action.payload.accessToken);
        toast.success('Login complete!');
      })
      .addCase(login.rejected, (state, action) => {
        toast.error(action.payload || 'Login failed');
      })

      .addCase(logout.fulfilled, () => {
        removeAuthHeader();
        toast.success('Logout complete!');
        return initialState;
      })
      .addCase(logout.rejected, () => {
        removeAuthHeader();
        toast.error('Logout failed');
        return initialState;
      })

      .addCase(refreshUser.fulfilled, (state, action) => {
        if (
          action.payload &&
          action.payload.user &&
          action.payload.accessToken
        ) {
          state.user = cleanUser(action.payload.user);
          state.accessToken = action.payload.accessToken;
          state.isLoggedIn = true;
          state.isRefreshing = false;

          setAuthHeader(action.payload.accessToken);
        } else {
          state.isRefreshing = false;
          toast.error('Session refresh failed. Please login again.');
        }
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;

        const errorMessage = action.payload;

        const shouldClearAuth =
          errorMessage &&
          (errorMessage.includes('Invalid or expired refresh token') ||
            errorMessage.includes('Session expired') ||
            errorMessage.includes('User not found') ||
            errorMessage.includes('Invalid refresh token'));

        if (shouldClearAuth) {
          state.isLoggedIn = false;
          state.accessToken = null;
          state.user = initialState.user;
          removeAuthHeader();

          toast.error('Session expired. Please login again.');
        } else {
          if (
            errorMessage !== 'No valid session found' &&
            errorMessage !== 'No refresh token provided in cookies'
          ) {
            toast.error('Connection issue. Please try again.');
          }
        }
      });
  },
});

export const { clearAuth } = slice.actions;
export default slice.reducer;
