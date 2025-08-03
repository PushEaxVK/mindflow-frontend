import { createAsyncThunk } from '@reduxjs/toolkit';
import { createThunk } from '../createThunk';
import axios from 'axios';

export const fetchArticleById = createThunk(
  'articles/fetchById',
  async (id) => {
    const response = await axios.get(`/articles/${id}`);
    console.log('Fetched article from API:', response.data);
    return response;
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
      const randomThree = shuffled.slice(0, 3);

      return randomThree;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const saveArticle = createThunk(
  'articles/saveArticle',
  async (articleId, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;
    const userId = state.auth.user.id;

    if (!token) {
      throw new Error('User not authenticated');
    }

    const response = await axios.post(
      `/users/${userId}/saved-articles/${articleId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);
export const unsaveArticle = createThunk(
  'articles/unsaveArticle',
  async (articleId, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.accessToken;
    const userId = state.auth.user.id;

    if (!token) throw new Error('User not authenticated');

    const response = await axios.delete(
      `/users/${userId}/saved-articles/${articleId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  }
);
export const fetchSavedArticles = createAsyncThunk(
  'articles/fetchSavedArticles',
  async ({ userId, page = 1, perPage = 12 }, thunkAPI) => {
    try {
      const res = await axios.get(`/users/${userId}/saved-articles`, {
        params: { page, perPage },
      });
      return res.data.data.articles;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch saved articles'
      );
    }
  }
);
