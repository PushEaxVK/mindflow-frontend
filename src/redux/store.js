import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import modalReducer from './modal/slice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { articlesReducer } from './articles/slice';
import { articleReducer } from './article/slice.js';

const persistConfig = {
  key: 'root-auth',
  version: 1,
  storage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    modal: modalReducer,
    articlesList: articlesReducer,
    article: articleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: import.meta.env.MODE === 'development',
});

export const persistor = persistStore(store);
