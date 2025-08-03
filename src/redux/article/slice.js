import { createSlice } from '@reduxjs/toolkit';
import {
  fetchArticleById,
  fetchSavedArticles,
  fetchThreePopularArticles,
  saveArticle,
  unsaveArticle,
} from './operation';

const initialState = {
  article: null,
  popularArticles: [],
  isSaved: false,
  isLoading: false,
  error: null,
  savedArticles: [],
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    clearArticle(state) {
      state.article = null;
      state.isSaved = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchArticleById
      .addCase(fetchArticleById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.article = action.payload;
        // Якщо у payload є інфо, чи збережена стаття — онови
        state.isSaved = action.payload?.isSaved || false;
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
        state.error = payload;
      })

      // saveArticle
      .addCase(saveArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveArticle.fulfilled, (state) => {
        state.isLoading = false;
        state.isSaved = true;
      })
      .addCase(saveArticle.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // unsaveArticle
      .addCase(unsaveArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(unsaveArticle.fulfilled, (state) => {
        state.isLoading = false;
        state.isSaved = false;
      })
      .addCase(unsaveArticle.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchSavedArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSavedArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.savedArticles = action.payload; // список збережених статей
      })
      .addCase(fetchSavedArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch saved articles';
      });
  },
});

export const { clearArticle } = articleSlice.actions;
export const articleReducer = articleSlice.reducer;
