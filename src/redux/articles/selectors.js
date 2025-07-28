export const selectAllArticles = (state) => state.articlesList.articles.items;
export const selectLoadingArticles = (state) =>
  state.articlesList.articles.loadingArticles;
export const selectErrorArticles = (state) =>
  state.articlesList.articles.errorArticles;
