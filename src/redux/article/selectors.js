export const selectArticle = (state) => state.article.article;
export const selectRecommendedArticles = (state) =>
  state.article.recommendedArticles;
export const selectSavedArticles = (state) => state.article.savedArticles;
export const selectIsArticlesLoading = (state) => state.article.isLoading;
export const selectArticlesError = (state) => state.article.error;
export const makeSelectIsArticleSaved = (articleId) => (state) =>
  state.article.savedArticles.some((article) => article._id === articleId);
