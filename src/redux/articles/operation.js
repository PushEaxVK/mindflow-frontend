import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllArticles = createAsyncThunk(
  'articles/fetchAll',
  async (__, thunkAPI) => {
    try {
      const response = await axios.get('/articles');
      return response.data;
      console.log(response.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
