import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllArticles = createAsyncThunk(
  'articles/fetchAll',
  async ({ page = 1, limit = 12, filter = '' }, thunkAPI) => {
    try {
      let url = '';

      if (filter === 'popular') {
        url = `/articles/popular?limit=${limit}&page=${page}`;
      } else {
        const query = `limit=${limit}&page=${page}${
          filter ? `&${filter}` : ''
        }`;
        url = `/articles?${query}`;
      }

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
