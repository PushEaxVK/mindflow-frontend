import { createSlice } from '@reduxjs/toolkit';
import {
  fetchArticleById,
  fetchSavedArticles,
  saveArticle,
  unsaveArticle,
} from './operation';

const initialState = {
  article: null,
  recommendedArticles: [],
  savedArticles: [],
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
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.article = action.payload.article;
        state.recommendedArticles = action.payload.recommended;
        state.isSaved = action.payload.article?.isSaved || false;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error fetching article';
      })
      .addCase(fetchSavedArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSavedArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.savedArticles = action.payload;
      })
      .addCase(fetchSavedArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch saved articles';
      })

      .addCase(saveArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSaved = true;

        const articleId = action.meta?.arg?.articleId;
        if (
          articleId &&
          !state.savedArticles.some((a) => a._id === articleId)
        ) {
          state.savedArticles.push({ _id: articleId });
        }
      })
      .addCase(saveArticle.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      .addCase(unsaveArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(unsaveArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSaved = false;

        const articleId = action.payload.articleId || action.meta.arg;
        state.savedArticles.articles = state.savedArticles.articles.filter(
          (article) => article._id !== articleId
        );
      })
      .addCase(unsaveArticle.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { clearArticle } = articleSlice.actions;
export const articleReducer = articleSlice.reducer;
