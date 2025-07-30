import { createSlice } from '@reduxjs/toolkit';
import { login, logout, refreshUser, register } from './operations';
import toast from 'react-hot-toast';
import { setAuthHeader } from '../../services/api.js';

const initialState = {
  user: {
    id: null,
    name: null,
    email: null,
    avatarUrl: null,
    savedArticles: [],
    articlesAmount: 0,
    role: 'user',
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const cleanUser = (user) => {
  if (!user) return initialState.user;
  return {
    id: user._id || null,
    name: user.name || null,
    email: user.email || null,
    avatarUrl: user.avatarUrl || null,
    savedArticles: user.savedArticles || [],
    articlesAmount: user.articlesAmount || 0,
    role: user.role || 'user',
  };
};

const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = cleanUser(action.payload.user);
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        toast.success('Registration complete!');
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = cleanUser(action.payload.data.user);
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        setAuthHeader(action.payload.data.accessToken);
        toast.success('Login complete!');
      })
      .addCase(logout.fulfilled, () => {
        toast.success('Logout complete!');
        return initialState;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = cleanUser(action.payload.user);
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export default slice.reducer;

// import { createSlice } from '@reduxjs/toolkit';
// import { login, logout, refreshUser, register } from './operations';
// import toast from 'react-hot-toast';

// const initialState = {
//   user: {
//     id: null,
//     name: null,
//     email: null,
//     avatarUrl: null,
//     savedArticles: [],
//     articlesAmount: 0,
//     role: 'user',
//   },
//   token: null,
//   isLoggedIn: false,
//   isRefreshing: false,
// };

// const cleanUser = (user) => {
//   if (!user) return null;

//   return {
//     id: user._id || null,
//     name: user.name || null,
//     email: user.email || null,
//     avatarUrl: user.avatarUrl || null,
//     savedArticles: user.savedArticles || [],
//     articlesAmount: user.articlesAmount || 0,
//     role: user.role || 'user',
//   };
// };

// const slice = createSlice({
//   name: 'auth',
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       .addCase(register.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isLoggedIn = true;
//         toast.success('Registration is complete!');
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.user = action.payload.data.user;
//         state.token = action.payload.data.accessToken;
//         state.isLoggedIn = true;
//         toast.success('Login complete!');
//       })
//       .addCase(logout.fulfilled, () => {
//         toast.success('Logout complete!');
//         return initialState;
//       })
//       .addCase(refreshUser.fulfilled, (state, action) => {
//         state.isLoggedIn = true;
//         state.user = action.payload;
//         console.log(action.payload);
//         state.isRefreshing = false;
//       })
//       .addCase(refreshUser.pending, (state, action) => {
//         state.isRefreshing = true;
//       })
//       .addCase(refreshUser.rejected, (state, action) => {
//         state.isRefreshing = false;
//       });
//   },
// });

// export default slice.reducer;
