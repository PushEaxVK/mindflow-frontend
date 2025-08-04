import { createAsyncThunk } from '@reduxjs/toolkit';

export const createThunk = (action, fetchData) => {
  return createAsyncThunk(action, async (body, thunkAPI) => {
    try {
      const response = await fetchData(body, thunkAPI);

      let responseData;
      if (response && 'data' in response) {
        responseData = response.data;
      } else if (response && typeof response === 'object') {
        responseData = response;
      } else {
        responseData = response;
      }

      if (action.includes('auth/')) {
        if (
          action.includes('login') ||
          action.includes('register') ||
          action.includes('refresh')
        ) {
          if (
            !action.includes('logout') &&
            (!responseData?.user || !responseData?.accessToken)
          ) {
            throw new Error(
              'Invalid response: missing user or accessToken data'
            );
          }
        }
      }

      return responseData;
    } catch (error) {
      let errorMessage;

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = `${action} failed`;
      }

      if (action.includes('auth/refresh')) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return thunkAPI.rejectWithValue('No valid session found');
        }
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  });
};
