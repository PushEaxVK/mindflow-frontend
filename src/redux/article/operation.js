import { createAsyncThunk } from '@reduxjs/toolkit';
import { createThunk } from '../createThunk';
import axios from 'axios';

export const fetchArticleById = createThunk(
  'articles/fetchById',
  async (id) => {
    const response = await axios.get(`/articles/${id}`);
    return response.data;
  }
);

export const saveArticle = createAsyncThunk(
  'articles/saveArticle',
  async (articleId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.accessToken;
      const userId = state.auth.user.id;

      if (!token) throw new Error('User not authenticated');

      await axios.post(`/users/${userId}/saved-articles/${articleId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { articleId };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Save failed'
      );
    }
  }
);

export const unsaveArticle = createAsyncThunk(
  'articles/unsaveArticle',
  async (articleId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.accessToken;
      const userId = state.auth.user.id;

      if (!token) throw new Error('User not authenticated');

      await axios.delete(`/users/${userId}/saved-articles/${articleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { articleId };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Unsave failed'
      );
    }
  }
);

export const fetchSavedArticles = createAsyncThunk(
  'articles/fetchSavedArticles',
  async ({ userId }, thunkAPI) => {
    try {
      if (!userId) throw new Error('User ID is required');

      const state = thunkAPI.getState();
      const token = state.auth.accessToken;

      if (!token) throw new Error('User not authenticated');

      const res = await axios.get(`/users/${userId}/saved-articles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data; // { articles, pagination }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          'Failed to fetch saved articles'
      );
    }
  }
);
