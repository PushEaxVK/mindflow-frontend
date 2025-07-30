import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllArticles = createAsyncThunk(
  'articles/fetchAll',
  async ({ page = 1, filter = 'all' }, thunkAPI) => {
    try {
      const baseUrl = filter === 'popular' ? '/articles/popular' : '/articles';
      const url = `${baseUrl}?limit=12&page=${page}`;

      const response = await axios.get(url);

      const data = Array.isArray(response.data)
        ? {
            articles: response.data,
            total: response.data.length,
            page: 1,
            pages: 1,
          }
        : response.data;

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
