export const selectAllArticles = (state) => state.articlesList.articles.items;
export const selectLoadingArticles = (state) =>
  state.articlesList.articles.loadingArticles;
export const selectErrorArticles = (state) =>
  state.articlesList.articles.errorArticles;
export const selectPage = (state) => state.articlesList.articles.page;
export const selectPages = (state) => state.articlesList.articles.pages;
export const selectTotalArticles = (state) => state.articlesList.articles.total;
