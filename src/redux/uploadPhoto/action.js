import axios from 'axios';

export const UPLOAD_PHOTO_REQUEST = 'photo/UPLOAD_PHOTO_REQUEST';
export const UPLOAD_PHOTO_SUCCESS = 'photo/UPLOAD_PHOTO_SUCCESS';
export const UPLOAD_PHOTO_FAILURE = 'photo/UPLOAD_PHOTO_FAILURE';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://mindflow-backend-iwk7.onrender.com';

export const uploadPhoto = (file) => {
  return async (dispatch) => {
    dispatch({ type: UPLOAD_PHOTO_REQUEST });

    try {
      const formData = new FormData();
      formData.append('photo', file);

      const response = await axios.post(`/photo`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = response.data;
      dispatch({
        type: UPLOAD_PHOTO_SUCCESS,
        payload: result.data.photo,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Помилка при завантаженні фото.';
      dispatch({
        type: UPLOAD_PHOTO_FAILURE,
        payload: errorMessage,
      });
    }
  };
};
