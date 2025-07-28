import { createSlice } from '@reduxjs/toolkit';
import { fetchAllArticles } from './operation';

const initialState = {
  articles: {
    items: [],
    loadingArticles: false,
    errorArticles: null,
  },
};

const articlesSlice = createSlice({
  name: 'articlesList',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllArticles.fulfilled, (state, action) => {
        state.articles.items = action.payload;
        state.articles.loadingArticles = false;
      })

      .addCase(fetchAllArticles.pending, (state) => {
        state.articles.errorArticles = null;
        state.articles.loadingArticles = true;
      })

      .addCase(fetchAllArticles.rejected, (state, action) => {
        state.articles.errorArticles = action.payload;
        state.articles.loadingArticles = false;
      });
  },
});

export const articlesReducer = articlesSlice.reducer;
