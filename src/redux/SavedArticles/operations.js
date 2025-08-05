import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSavedArticles = createAsyncThunk(
  'savedArticles/fetchAll',
  async ({ userId, page = 1, limit = 6 }, thunkAPI) => {
    try {
      const response = await axios.get(
        `/users/${userId}/saved-articles?limit=${limit}&page=${page}`,
        {
          withCredentials: true,
        }
      );
      //  return response.data.data.articles;
      const data = response.data?.data;

      const articles = data?.articles || [];
      const pagination = data?.pagination?.totalItems || {};

      return {
        articles,
        page: pagination.page || 1,
        total: pagination.total || articles.length,
        perPage: pagination.perPage || 10,
      };
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
