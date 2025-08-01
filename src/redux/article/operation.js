import { createThunk } from '../createThunk';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticleById = createThunk(
  'articles/fetchById',
  async (id) => {
    const response = await axios.get(`/articles/${id}`);
    console.log('Fetched article from API:', response.data);
    return response;
  }
);
export const fetchThreePopularArticles = createAsyncThunk(
  'articles/fetchThreePopular',
  async () => {
    const response = await axios.get('/articles/popular'); // отримаємо всі популярні
    const allPopular = response.data;
    const shuffled = allPopular.sort(() => 0.5 - Math.random());
    const randomThree = shuffled.slice(0, 3);

    return randomThree;
  }
);

export const saveArticle = createThunk(
  'articles/saveArticle',
  async (articleId, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      throw new Error('User not authenticated');
    }

    // axios вже має збережений заголовок Authorization, але для надійності додаємо:
    const response = await axios.post(`/articles/${articleId}/save`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);
