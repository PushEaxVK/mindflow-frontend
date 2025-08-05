import { createSlice } from '@reduxjs/toolkit';
import { fetchSavedArticles, toggleSaveArticle } from './operations.js';

const savedArticlesSlice = createSlice({
  name: 'savedArticles',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    savedArticlesPage: 1,
    savedArticlesPages: 1,
    savedArticlesTotal: 0,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSavedArticles.fulfilled, (state, action) => {
        const { articles = [], page, total, perPage } = action.payload;

        state.isLoading = false;
        state.items = page === 1 ? articles : [...state.items, ...articles];

        state.savedArticlesPage = page;
        state.savedArticlesTotal = total;
        state.savedArticlesPages = Math.ceil(total / perPage); // <-- підрахунок totalPages
      })
      .addCase(fetchSavedArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(toggleSaveArticle.fulfilled, (state, action) => {
        const { articleId, isSaved, updatedList } = action.payload;
        if (isSaved) {
          state.items = state.items.filter((item) => item._id !== articleId);
        } else if (updatedList) {
          state.items = updatedList;
        }
      });
  },
});

export const savedArticlesReducer = savedArticlesSlice.reducer;
