export const selectArticle = (state) => state.article.article;
export const selectPopularArticles = (state) => state.article.popularArticles;
export const selectIsArticleSaved = (state) => state.article.isSaved;
export const selectIsArticlesLoading = (state) => state.article.isLoading;
export const selectArticlesError = (state) => state.article.error;
