import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAuthorById = createAsyncThunk(
  'authorById/fetchAuthorById',
  async ({ ownerId }, thunkAPI) => {
    try {
      const response = await axios.get(`/users/${ownerId}`);

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const fetchArticlesAuthorById = createAsyncThunk(
  'authorArticles/fetchByAuthorId',
  async ({ ownerId, page = 1 }, thunkAPI) => {
    try {
      const response = await axios.get(`/users/${ownerId}/articles`, {
        params: { page },
      });

      const data = response.data.data;

      return {
        articles: data.userArticles,
        page: data.pagination.totalItems.page,
        total: data.pagination.totalItems.total,
        perPage: data.pagination.totalItems.perPage,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
