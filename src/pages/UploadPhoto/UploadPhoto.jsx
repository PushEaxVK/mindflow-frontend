import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPhoto } from '../../redux/uploadPhoto/action';


const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();
  const { loading, photoUrl, error } = useSelector(state => state.photo);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Будь ласка, виберіть файл для завантаження!');
      return;
    }
    dispatch(uploadPhoto(selectedFile));
  };

  return (
    <div>
      <h2>Upload your photo</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Завантаження...' : 'Save'}
      </button>

      {error && <p>{error}</p>}
      
      {photoUrl && (
        <div>
          <p>Фото успішно завантажено!</p>
          <img src={photoUrl} alt="Завантажене фото" />
        </div>
      )}
    </div>
  );
};

export default UploadForm;