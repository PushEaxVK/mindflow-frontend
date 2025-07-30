import { createSlice } from '@reduxjs/toolkit';
import { login, logout, refreshUser, register } from './operations';
import toast from 'react-hot-toast';

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        toast.success('Registration complete! You are now logged in.');
      })
      .addCase(register.rejected, (state, action) => {
        toast.error(action.payload || 'Registration failed');
      })
      
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
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
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isLoggedIn = true;
          state.isRefreshing = false;
        } else {
          state.isRefreshing = false;
          state.isLoggedIn = false;
          state.token = null;
          state.user = { name: null, email: null };
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
        state.user = { name: null, email: null };
        
        const errorMessage = action.payload;
        if (errorMessage !== 'No valid session found' && 
            errorMessage !== 'No refresh token provided in cookies') {
          toast.error('Session expired. Please login again.');
        }
      });
  },
});

export default slice.reducer;