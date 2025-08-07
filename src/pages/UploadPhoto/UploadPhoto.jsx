import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPhoto } from '../../redux/uploadPhoto/photoSlice';
import { toast } from 'react-toastify';
import styles from './uploadPhotoCss.module.css';
import CameraIcon from '../../SVG/camera.svg?url';
import { useNavigate } from 'react-router-dom';

const UploadPhoto = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const dispatch = useDispatch();
  const { loading, photoUrl } = useSelector((state) => state.photo);

  useEffect(() => {
    if (photoUrl) {
      navigate('/');
    }
  }, [photoUrl, navigate]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    } else {
      setPreviewUrl(null);
    }
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
        {previewUrl ? (
          <img src={previewUrl} alt="Превʼю фото" />
        ) : photoUrl ? (
          <img src={photoUrl} alt="Завантажене фото" />
        ) : (
          <img
            src={CameraIcon}
            className={styles.cameraIcon}
            alt="Іконка камери"
          />
        )}
      </label>

      <button
        onClick={handleUpload}
        disabled={loading || !selectedFile}
        className={styles.buttonSave}
      >
        {loading ? 'loading...' : 'Save'}
      </button>
    </div>
  );
};

export default UploadPhoto;