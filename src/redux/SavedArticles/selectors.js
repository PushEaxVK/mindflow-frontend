export const selectSavedArticles = (state) =>
  Array.isArray(state.savedArticles.items) ? state.savedArticles.items : [];
export const selectSavedArticlesLoading = (state) =>
  state.savedArticles.isLoading;
export const selectSavedArticlesError = (state) => state.savedArticles.error;
