export const selectSavedArticles = (state) =>
  Array.isArray(state.savedArticles.items) ? state.savedArticles.items : [];
export const selectSavedArticlesLoading = (state) =>
  state.savedArticles.isLoading;
export const selectSavedArticlesError = (state) => state.savedArticles.error;

export const selectSavedArticlesPage = (state) =>
  state.savedArticles.savedArticlesPage;
export const selectSavedArticlesPages = (state) =>
  state.savedArticles.savedArticlesPages;
export const selectSavedArticlesTotal = (state) =>
  state.savedArticles.savedArticlesTotal;
