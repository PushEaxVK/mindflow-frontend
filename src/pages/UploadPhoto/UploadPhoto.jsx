import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPhoto } from '../../redux/uploadPhoto/photoSlice';
import { toast } from 'react-toastify';
import s from './uploadPhotoCss.module.css';

const UploadPhoto = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();
  const { loading, photoUrl } = useSelector(state => state.photo);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error('Будь ласка, виберіть файл для завантаження!');
      return;
    }
    dispatch(uploadPhoto(selectedFile));
  };

  return (
    <div className={s.boxContainer}>
      <h2 className={s.title}>Upload your photo</h2>
      <input className={s.inputPhoto} type="file" onChange={handleFileChange} />
      <button className={s.buttonSave} onClick={handleUpload} disabled={loading}>
        {loading ? 'loading...' : 'Save'}
      </button>

      {photoUrl && (
        <div className={s.avatarPhotoContainer}>
          <img className={s.avatarPhoto} src={photoUrl} alt="Завантажене фото" />
        </div>
      )}
    </div>
  );
};

export default UploadPhoto;