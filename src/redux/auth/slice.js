import { createSlice } from '@reduxjs/toolkit';
import { login, logout, refreshUser, register } from './operations';
import toast from 'react-hot-toast';
import { setAuthHeader } from '../../services/api.js';

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
  token: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = cleanUser(action.payload.user);
        state.token = action.payload.token;
        state.isLoggedIn = true;
        toast.success('Registration complete! You are now logged in.');
      })
      .addCase(register.rejected, (state, action) => {
        toast.error(action.payload || 'Registration failed');
      })
      
      .addCase(login.fulfilled, (state, action) => {
        state.user = cleanUser(action.payload.user);
        state.token = action.payload.token;
        state.isLoggedIn = true;
        setAuthHeader(action.payload.token);
        toast.success('Login complete!');
      })
      .addCase(login.rejected, (state, action) => {
        toast.error(action.payload || 'Login failed');
      })
      
      .addCase(logout.fulfilled, () => {
        toast.success('Logout complete!');
        return initialState;
      })
      .addCase(logout.rejected, () => {
        toast.error('Logout failed');
        return initialState;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        if (action.payload && action.payload.user && action.payload.token) {
          state.user = cleanUser(action.payload.user);
          state.token = action.payload.token;
          state.isLoggedIn = true;
          state.isRefreshing = false;
        } else {
          state.isRefreshing = false;
          state.isLoggedIn = false;
          state.token = null;
          state.user = initialState.user;
          toast.error('Session refresh failed. Please login again.');
        }
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.token = null;
        state.user = initialState.user;
        
        const errorMessage = action.payload;
        if (errorMessage !== 'No valid session found' && 
            errorMessage !== 'No refresh token provided in cookies') {
          toast.error('Session expired. Please login again.');
        }
      });
  },
});

export default slice.reducer;