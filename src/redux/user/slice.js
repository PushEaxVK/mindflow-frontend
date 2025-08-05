import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthorById, fetchArticlesAuthorById } from './operation.js';

const initialState = {
  authorData: null,
  loading: false,
  error: null,

  authorArticles: [],
  authorArticlesPage: 1,
  authorArticlesPages: 1,
  authorArticlesTotal: 0,
  loadingArticles: false,
  errorArticles: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthorById.fulfilled, (state, action) => {
        state.loading = false;
        state.authorData = action.payload;
      })
      .addCase(fetchAuthorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(fetchArticlesAuthorById.pending, (state) => {
        state.loadingArticles = true;
        state.errorArticles = null;
      })
      .addCase(fetchArticlesAuthorById.fulfilled, (state, action) => {
        const { articles, page, total, perPage } = action.payload;

        state.loadingArticles = false;
        state.authorArticles =
          page === 1 ? articles : [...state.authorArticles, ...articles];

        state.authorArticlesPage = page;
        state.authorArticlesTotal = total;
        state.authorArticlesPages = Math.ceil(total / perPage);
      })
      .addCase(fetchArticlesAuthorById.rejected, (state, action) => {
        state.loadingArticles = false;
        state.errorArticles = action.payload;
      });
  },
});

export const authorReducer = authorSlice.reducer;
