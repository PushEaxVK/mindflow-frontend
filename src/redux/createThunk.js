import { createAsyncThunk } from '@reduxjs/toolkit';

export const createThunk = (action, fetchData) => {
  return createAsyncThunk(action, async (body, thunkAPI) => {
    try {
      const response = await fetchData(body, thunkAPI);
      const responseData = response?.data ?? response;
      return responseData;
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || err.message || `${action} failed`;
      
      if (action.includes('auth/refresh') && (status === 400 || status === 401)) {
        return thunkAPI.rejectWithValue('Session expired');
      }
      
      return thunkAPI.rejectWithValue(message);
    }
  });
};