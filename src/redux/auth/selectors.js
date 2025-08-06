export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const selectHasValidSession = (state) => {
  return state.auth.isLoggedIn && 
         state.auth.token && 
         state.auth.user.email;
};

export const selectIsAuthenticated = (state) => {
  return state.auth.isLoggedIn && !state.auth.isRefreshing;
};