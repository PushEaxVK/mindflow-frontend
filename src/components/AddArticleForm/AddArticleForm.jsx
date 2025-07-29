import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import styles from './AddArticleForm.module.css';

export const AddArticleForm = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      article: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      article: Yup.string().required('Article text is required'),
    }),

    onSubmit: async (values) => {
      
       if (!isLoggedIn) {
         toast.error('Please log in to create an article');
         return;
       }

      if (image && image.size > 1024 * 1024) {
        toast.error('Image size exceeds 1MB. Please upload a smaller image.');
        return;
      }

      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('article', values.article);
      formData.append('date', selectedDate.toISOString());
      formData.append('author', user._id);
      if (image) formData.append('image', image);

      try {
        const res = await axios.post('/articles/create', formData);
        toast.success('Article published successfully!');
        const articleId = res.data._id?.$oid || res.data._id || res.data.id;
        navigate(`/articles/${articleId}`);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || 'Failed to publish article'
        );
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={styles.form}
      encType="multipart/form-data"
    >
      <div className={styles.leftColumn}>
        <div className={styles.topSection}>
          <div className={styles.imageUploadBox}>
            <label htmlFor="imageUpload" className={styles.imageLabel}>
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className={styles.imagePreview}
                  />
                  <span className={styles.tooltipOverlay}>Change image</span>
                </>
              ) : (
                <>
                  <svg
                    width="162"
                    height="136"
                    viewBox="0 0 162 136"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M99.3706 74.2115C99.3706 82.7879 91.0995 89.7404 80.8966 89.7404C70.6937 89.7404 62.4226 82.7879 62.4226 74.2115C62.4226 65.6352 70.6937 58.6827 80.8966 58.6827C91.0995 58.6827 99.3706 65.6352 99.3706 74.2115Z"
                      stroke="#070707"
                    />
                    <path
                      d="M32.8643 95.625L32.8643 57.7764C32.8643 51.4158 38.9984 46.2596 46.5653 46.2596C51.7549 46.2596 56.4991 43.7949 58.8199 39.8932L61.925 34.673C64.4944 30.3535 69.7466 27.625 75.4918 27.625L86.3014 27.625C92.0466 27.6251 97.2988 30.3536 99.8681 34.6731L102.973 39.8933C105.294 43.7951 110.038 46.2597 115.228 46.2597C122.795 46.2597 128.929 51.4159 128.929 57.7765V95.625C128.929 102.667 122.138 108.375 113.761 108.375H48.0324C39.6552 108.375 32.8643 102.667 32.8643 95.625Z"
                      stroke="#070707"
                    />
                  </svg>
                  <span className={styles.tooltipOverlay}>Upload image</span>
                </>
              )}
            </label>

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);

                if (file) {
                  const previewURL = URL.createObjectURL(file);
                  setImagePreview(previewURL);
                } else {
                  setImagePreview(null);
                }
              }}
            />

            {image && image.size > 1024 * 1024 && (
              <div className={styles.error}>
                Image exceeds 1MB. Please select a smaller image.
              </div>
            )}
          </div>

          <label className={styles.titleLabel}>
            <span className={styles.labelText}>Title:</span>
            <input
              name="title"
              className={styles.input}
              placeholder="Enter the title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.touched.title && formik.errors.title && (
              <div className={styles.error}>{formik.errors.title}</div>
            )}
          </label>
        </div>

        <label className={styles.articleLabel}>
          <textarea
            name="article"
            className={styles.textarea}
            placeholder="Enter a text"
            value={formik.values.article}
            onChange={formik.handleChange}
          />
          {formik.touched.article && formik.errors.article && (
            <div className={styles.error}>{formik.errors.article}</div>
          )}
        </label>

        <button type="submit" className={styles.submitBtn}>
          Publish Article
        </button>
      </div>

      <div className={styles.rightColumn}>
        <label className={styles.label}>
          Publish date:
          <div className={styles.datePicker}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </div>
        </label>
      </div>
    </form>
  );
};
