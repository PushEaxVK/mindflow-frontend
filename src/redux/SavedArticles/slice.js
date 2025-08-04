// import { createSlice } from '@reduxjs/toolkit';
// import { fetchSavedArticles, toggleSaveArticle } from './operations.js';

// const savedArticlesSlice = createSlice({
//   name: 'savedArticles',
//   initialState: {
//     items: [],
//     isLoading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSavedArticles.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchSavedArticles.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchSavedArticles.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       .addCase(toggleSaveArticle.fulfilled, (state, action) => {
//         const { articleId, isSaved } = action.payload;

//         if (isSaved) {
//           state.items = state.items.filter((item) => item._id !== articleId);
//         } else {
//           //
//         }
//       });
//   },
// });
// export const savedArticlesReducer = savedArticlesSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import { fetchSavedArticles, toggleSaveArticle } from './operations.js';

const savedArticlesSlice = createSlice({
  name: 'savedArticles',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Laden der gespeicherten Artikel
      .addCase(fetchSavedArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSavedArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchSavedArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Speichern/Löschen von Artikeln
      .addCase(toggleSaveArticle.fulfilled, (state, action) => {
        const { articleId, isSaved, article } = action.payload;
        if (isSaved) {
          // Entfernen beim Löschen
          state.items = state.items.filter((item) => item._id !== articleId);
        } else if (article) {
          // Hinzufügen beim Speichern
          state.items.unshift(article);
        }
      });
  },
});

export const savedArticlesReducer = savedArticlesSlice.reducer;
