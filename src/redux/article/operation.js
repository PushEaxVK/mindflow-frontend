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

export const toggleSaveBookmark = createThunk('articles/save', () =>
  axios.post(`/articles/save`)
);
