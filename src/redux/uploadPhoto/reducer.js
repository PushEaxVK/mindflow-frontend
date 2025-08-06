
import { UPLOAD_PHOTO_REQUEST, UPLOAD_PHOTO_SUCCESS, UPLOAD_PHOTO_FAILURE } from './action';

const initialState = {
  photoUrl: null,
  loading: false,
  error: null,
};

const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_PHOTO_REQUEST:
      return { ...state, loading: true, error: null };
    case UPLOAD_PHOTO_SUCCESS:
      return { ...state, loading: false, photoUrl: action.payload };
    case UPLOAD_PHOTO_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default photoReducer;