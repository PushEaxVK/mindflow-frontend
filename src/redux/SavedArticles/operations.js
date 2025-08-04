// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const toggleSaveArticle = createAsyncThunk(
//   'savedArticles/toggle',
//   async ({ userId, articleId, isSaved }, thunkAPI) => {
//     try {
//       if (isSaved) {
//         await axios.delete(`/users/${userId}/saved-articles/${articleId}`);
//       } else {
//         await axios.post(`/users/${userId}/saved-articles/${articleId}`);
//       }

//       return { articleId, isSaved };
//     } catch (error) {
//       if (error.response?.status === 409 && !isSaved) {
//         return { articleId, isSaved: true };
//       }

//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// export const fetchSavedArticles = createAsyncThunk(
//   'savedArticles/fetchAll',
//   async (userId, thunkAPI) => {
//     try {
//       const response = await axios.get(`/users/${userId}/saved-articles`, {
//         withCredentials: true,
//       });
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// export const removeSavedArticle = createAsyncThunk(
//   'savedArticles/remove',
//   async ({ userId, articleId }, thunkAPI) => {
//     try {
//       await axios.delete(`/users/${userId}/saved-articles/${articleId}`);
//       return { articleId };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// export const saveArticle = createAsyncThunk(
//   'savedArticles/save',
//   async ({ userId, articleId }, thunkAPI) => {
//     try {
//       await axios.post(`/users/${userId}/saved-articles/${articleId}`);
//       return { articleId };
//     } catch (error) {
//       if (error.response?.status === 409) {
//         return { articleId };
//       }

//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSavedArticles = createAsyncThunk(
  'savedArticles/fetchAll',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`/users/${userId}/saved-articles`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const toggleSaveArticle = createAsyncThunk(
  'savedArticles/toggle',
  async ({ userId, articleId, isSaved }, thunkAPI) => {
    try {
      if (isSaved) {
        await axios.delete(`/users/${userId}/saved-articles/${articleId}`);
        return { articleId, isSaved: true };
      } else {
        const response = await axios.post(
          `/users/${userId}/saved-articles/${articleId}`
        );

        return {
          articleId,
          isSaved,
          updatedList: response.data.savedArticles,
        };
      }
    } catch (error) {
      if (error.response?.status === 409 && !isSaved) {
        return { articleId, isSaved: true };
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
