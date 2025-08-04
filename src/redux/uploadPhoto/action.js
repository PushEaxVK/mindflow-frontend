
export const UPLOAD_PHOTO_REQUEST = 'photo/UPLOAD_PHOTO_REQUEST';
export const UPLOAD_PHOTO_SUCCESS = 'photo/UPLOAD_PHOTO_SUCCESS';
export const UPLOAD_PHOTO_FAILURE = 'photo/UPLOAD_PHOTO_FAILURE';

export const uploadPhoto = (file) => {
  return async (dispatch) => {
    dispatch({ type: UPLOAD_PHOTO_REQUEST });
    
    try {
      const formData = new FormData();
      formData.append('photo', file); 

      const response = await fetch('http://localhost:8080/photo', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Помилка при завантаженні фото.');
      }

      const result = await response.json();
      dispatch({ 
        type: UPLOAD_PHOTO_SUCCESS,
        payload: result.data.photo 
      });
    } catch (error) {
      dispatch({ 
        type: UPLOAD_PHOTO_FAILURE,
        payload: error.message 
      });
    }
  };
};