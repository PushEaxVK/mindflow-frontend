import { createAsyncThunk } from '@reduxjs/toolkit';

export const createThunk = (action, fetchData) => {
  return createAsyncThunk(action, async (body, thunkAPI) => {
    try {
      const response = await fetchData(body, thunkAPI);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
};
