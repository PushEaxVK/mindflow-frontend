import { createAsyncThunk } from '@reduxjs/toolkit';
import { createThunk } from '../createThunk';
import axios from 'axios';

export const fetchArticleById = createThunk(
  'articles/fetchById',
  async (id) => {
    const response = await axios.get(`/articles/${id}`);
    console.log('ARCTICLE', response.data);
    return response.data;
  }
);

export const fetchThreePopularArticles = createAsyncThunk(
  'articles/fetchThreeRandomPopular',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/articles', {
        params: {
          limit: 100,
          sort: 'rate',
          order: 'desc',
        },
      });

      const articles = Array.isArray(response.data)
        ? response.data
        : response.data.articles || [];

      const shuffled = articles.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
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
      console.log('SAVE', articleId);

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
      console.log('UNSAVE', articleId);
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
      console.log('SAVED ARTICLES', res.data.data);
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
