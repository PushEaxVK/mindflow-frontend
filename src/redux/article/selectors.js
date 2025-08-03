export const selectArticle = (state) => state.article.article;
export const selectPopularArticles = (state) => state.article.popularArticles;
// export const selectIsArticleSaved = (state) => state.article.isSaved;
export const selectIsArticlesLoading = (state) => state.article.isLoading;
export const selectArticlesError = (state) => state.article.error;
export const selectIsArticleSaved = (articleId) => (state) =>
  state.article.savedArticles?.find((article) => article._id === articleId);
