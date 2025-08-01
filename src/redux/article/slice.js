import { createSlice } from '@reduxjs/toolkit';
import {
  fetchArticleById,
  fetchThreePopularArticles,
  toggleSaveBookmark,
} from './operation';

const initialState = {
  article: null,
  popularArticles: [],
  isSaved: false,
  isLoading: false,
  error: null,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    clearArticle(state) {
      state.article = null;
      state.isSaved = false;
    },
  },
  extraReducers: (builder) => {
    // fetchArticleById
    builder
      .addCase(fetchArticleById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.article = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error fetching article';
      })

      // fetchThreePopularArticles
      .addCase(fetchThreePopularArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchThreePopularArticles.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.popularArticles = payload;
      })
      .addCase(fetchThreePopularArticles.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.article.error = payload;
      })

      // toggleSaveBookmark
      .addCase(toggleSaveBookmark.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleSaveBookmark.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSaved = payload?.isSaved;
      })
      .addCase(toggleSaveBookmark.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { clearArticle } = articleSlice.actions;
export const articleReducer = articleSlice.reducer;
