import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSavedArticles = createAsyncThunk(
  'savedArticles/fetchAll',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`/users/${userId}/saved-articles`, {
        withCredentials: true,
      });
      return response.data.data.articles;
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
          isSaved: false,
          updatedList: response.data.data.articles,
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
