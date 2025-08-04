import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';


export const uploadPhoto = createAsyncThunk(
  'photo/uploadPhoto',
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('photo', file);

      const response = await fetch('http://localhost:8080/photo', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        
        const errorData = await response.json();
        throw new Error(errorData.message || 'Помилка при завантаженні фото.');
      }

      const result = await response.json();
      toast.success('Фото успішно завантажено!'); 
      return result.data.photo;
    } catch (error) {
      toast.error(error.message); 
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const photoSlice = createSlice({
  name: 'photo',
  initialState: {
    photoUrl: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(uploadPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      .addCase(uploadPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.photoUrl = action.payload;
      })
      
      .addCase(uploadPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default photoSlice.reducer;

