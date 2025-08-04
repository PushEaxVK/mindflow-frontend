import { createSlice } from '@reduxjs/toolkit';
import { fetchAllArticles } from './operation';

const initialState = {
  articles: {
    items: [],
    page: 1,
    pages: 1,
    total: null,
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
        const { articles, page, pages, total } = action.payload;

        if (page === 1) {
          // Якщо перша сторінка, замінюємо список
          state.articles.items = articles;
        } else {
          // Якщо наступні сторінки, додаємо нові статті в кінець списку
          state.articles.items = [...state.articles.items, ...articles];
        }

        state.articles.page = page;
        state.articles.pages = pages;
        state.articles.total = total;
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
