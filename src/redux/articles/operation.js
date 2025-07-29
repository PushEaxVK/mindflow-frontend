import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllArticles = createAsyncThunk(
  'articles/fetchAll',
  async (endpoint = '/articles?limit=12', thunkAPI) => {
    try {
      const response = await axios.get(endpoint);

      // Якщо бекенд повертає масив — обгортаємо вручну:
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

export const fetchArticlesById = createAsyncThunk(
  'articles/fetchById',
  async (authorId, thunkAPI) => {
    try {
      const response = await axios.get(`/articles/${authorId}`);
      // Очікується: { author: 1674389, title: 'dgdfgdfgdf', desc: 'fgdfgfdgdfgf', ... }
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
