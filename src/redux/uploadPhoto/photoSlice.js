import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Створюємо асинхронний thunk для запиту до API
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
        // Якщо відповідь не успішна, створюємо об'єкт помилки
        const errorData = await response.json();
        throw new Error(errorData.message || 'Помилка при завантаженні фото.');
      }

      const result = await response.json();
      toast.success('Фото успішно завантажено!'); // Виводимо сповіщення про успіх
      return result.data.photo;
    } catch (error) {
      toast.error(error.message); // Виводимо сповіщення про помилку
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Створюємо slice
const photoSlice = createSlice({
  name: 'photo',
  initialState: {
    photoUrl: null,
    loading: false,
    error: null,
  },
  reducers: {}, // Тут можна додати синхронні редюсери, якщо вони потрібні
  extraReducers: (builder) => {
    builder
      // Обробка стану "pending"
      .addCase(uploadPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Обробка стану "fulfilled" (успішно)
      .addCase(uploadPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.photoUrl = action.payload;
      })
      // Обробка стану "rejected" (помилка)
      .addCase(uploadPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default photoSlice.reducer;