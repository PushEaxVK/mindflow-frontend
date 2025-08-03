// Автор
export const selectAuthorData = (state) => state.author.authorData;
export const selectAuthorLoading = (state) => state.author.loading;
export const selectAuthorError = (state) => state.author.error;

// Статті автора
export const selectAuthorArticles = (state) => state.author.authorArticles;
export const selectAuthorArticlesPage = (state) => state.author.articlesPage;
export const selectAuthorArticlesPages = (state) => state.author.articlesPages;
export const selectAuthorArticlesTotal = (state) => state.author.articlesTotal;

export const selectAuthorArticlesLoading = (state) =>
  state.author.loadingArticles;
export const selectAuthorArticlesError = (state) => state.author.errorArticles;
