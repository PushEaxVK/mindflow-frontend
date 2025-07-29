import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllArticles = createAsyncThunk(
  'articles/fetchAll',
  async (__, thunkAPI) => {
    try {
      const response = await axios.get('/articles?limit=12');
      // Очікується: { articles: [], total: 200, page: 1, pages: 17 }
      //console.log('Fetched articles:', response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
