import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPhoto } from '../../redux/uploadPhoto/photoSlice';
import { toast } from 'react-toastify';
import styles from './uploadPhotoCss.module.css';
import { ReactComponent as CameraIcon } from '../../SVG/camera.svg';

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
    <div className={styles.boxContainer}>
      
      <h2 className={styles.title}>Upload your photo</h2>

      <input 
        type="file" 
        id="file-input" 
        className={styles.inputFile} 
        onChange={handleFileChange} 
      />
      
      <label htmlFor="file-input" className={styles.avatarPhotoContainer}>
        {photoUrl ? (
          <img src={photoUrl} alt="Завантажене фото" />
        ) : (
          <CameraIcon className={styles.cameraIcon} />
        )}
      </label>

      <button onClick={handleUpload} disabled={loading || !selectedFile} className={styles.buttonSave}>
        {loading ? 'loading...' : 'Save'}
      </button>
    </div>
  );

};

export default UploadPhoto;