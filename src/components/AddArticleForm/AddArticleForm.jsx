import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';

// TipTap
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';

import styles from './AddArticleForm.module.css';

export const AddArticleForm = () => {
  const { id: articleId } = useParams();
  const isEditing = Boolean(articleId);

  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const formik = useFormik({
    initialValues: {
      title: '',
      desc: '',
      article: '', // plain text
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, 'Title must be at least 3 characters')
        .max(48, 'Title must not exceed 48 characters')
        .required('Title is required'),
      desc: Yup.string()
        .min(5, 'Description must be at least 5 characters')
        .max(100, 'Description must not exceed 100 characters')
        .required('Description is required'),
      article: Yup.string()
        .min(100, 'Article must be at least 100 characters')
        .max(4000, 'Article must not exceed 4000 characters')
        .required('Article text is required'),
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
      formData.append('desc', values.desc);
      formData.append('article', values.article); // plain text
      formData.append('date', selectedDate.toISOString());
      formData.append('ownerId', user.id);
      if (image) formData.append('img', image);

      try {
        const res = isEditing
          ? await axios.patch(`/articles/${articleId}`, formData)
          : await axios.post('/articles/create', formData);

        toast.success('Article published successfully!');
        const id = res.data.data._id;
        navigate(`/articles/${id}`);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || 'Failed to publish article'
        );
      }
    },
  });

  const { setValues } = formik;

  useEffect(() => {
    if (!isEditing) return;

    const loadArticle = async () => {
      try {
        const { data } = await axios.get(`/articles/${articleId}`);
        setValues({
          title: data.title,
          desc: data.desc || '',
          article: data.article, // plain text
        });
        setSelectedDate(new Date(data.createdAt || data.date));
        setImagePreview(data.img ? `/uploads/${data.img}` : null);
      } catch {
        toast.error('Failed to load article');
      }
    };

    loadArticle();
  }, [articleId, isEditing, setValues]);

  const textareaRef = useRef(null);
  const MIN_TEXTAREA_HEIGHT = 393;
  const floatingToolbarRef = useRef(null);
  const [floatingVisible, setFloatingVisible] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });

  const resizeTextarea = () => {
    if (!textareaRef.current) return;
    const proseMirror = textareaRef.current.querySelector('.ProseMirror');
    if (!proseMirror) return;

    proseMirror.style.height = 'auto';
    const contentHeight = proseMirror.scrollHeight;

    if (contentHeight <= MIN_TEXTAREA_HEIGHT) {
      proseMirror.style.height = `${MIN_TEXTAREA_HEIGHT}px`;
      textareaRef.current.style.height = `${MIN_TEXTAREA_HEIGHT}px`;
    } else {
      proseMirror.style.height = `${contentHeight}px`;
      textareaRef.current.style.height = `${contentHeight + 24}px`;
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: false, underline: false }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      Placeholder.configure({
        placeholder: 'Enter the text',
        emptyNodeClass: 'is-editor-empty',
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
      }),
      Underline,
    ],
    content: formik.values.article,
    onUpdate: ({ editor }) => {
      const plainText = editor.getText(); // plain text only
      formik.setFieldValue('article', plainText);

      const excerpt = plainText.trim().slice(0, 100);
      formik.setFieldValue('desc', excerpt);

      resizeTextarea();

      const proseMirror = textareaRef.current?.querySelector('.ProseMirror');
      if (!proseMirror) return;
      proseMirror.classList.toggle('is-empty', editor.isEmpty);
    },
  });
  const updateFloatingToolbar = useCallback(() => {
    if (!editor) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
      setFloatingVisible(false);
      return;
    }
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    setToolbarPosition({
      top: rect.top + window.scrollY - 45,
      left: rect.left + window.scrollX + rect.width / 2,
    });
    setFloatingVisible(true);
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    editor.on('selectionUpdate', updateFloatingToolbar);
    return () => editor.off('selectionUpdate', updateFloatingToolbar);
  }, [editor, updateFloatingToolbar]);

  const toggleBold = () => editor?.chain().focus().toggleBold().run();
  const toggleItalic = () => editor?.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor?.chain().focus().toggleUnderline().run();
  const toggleStrike = () => editor?.chain().focus().toggleStrike().run();
  const toggleBulletList = () => editor?.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => editor?.chain().focus().toggleOrderedList().run();
  const setLink = () => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

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
                setImagePreview(file ? URL.createObjectURL(file) : null);
              }}
            />

            {image && image.size > 1024 * 1024 && (
              <div className={styles.error}>Image exceeds 1MB</div>
            )}
          </div>

          <label className={styles.titleLabel}>
            <span className={styles.labelText}>{isEditing ? 'Article Title:' : 'Title:'}</span>
            <input
              name="title"
              className={styles.input}
              placeholder="Enter the title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <div className={styles.error}>{formik.errors.title}</div>
            )}
          </label>

          <input type="hidden" name="desc" value={formik.values.desc} />
        </div>

        <div className={styles.toolbar}>
          <button type="button" onClick={toggleBold}><b>B</b></button>
          <button type="button" onClick={toggleItalic}><i>I</i></button>
          <button type="button" onClick={toggleUnderline}><u>U</u></button>
          <button type="button" onClick={toggleStrike}><s>S</s></button>
          <button type="button" onClick={toggleBulletList}>• List</button>
          <button type="button" onClick={toggleOrderedList}>1. List</button>
          <button type="button" onClick={setLink}>🔗</button>
        </div>
        {floatingVisible && (
          <div
            className={styles.floatingToolbar}
            style={{
              top: toolbarPosition.top,
              left: toolbarPosition.left,
            }}
            ref={floatingToolbarRef}
          >
            <button type="button" onClick={toggleBold}><b>B</b></button>
            <button type="button" onClick={toggleItalic}><i>I</i></button>
            <button type="button" onClick={toggleUnderline}><u>U</u></button>
            <button type="button" onClick={toggleStrike}><s>S</s></button>
            <button type="button" onClick={setLink}>🔗</button>
          </div>
        )}

        <div className={styles.articleWrapper} ref={textareaRef}>
          <span id="articleLabel">Article</span>
          <EditorContent
            editor={editor}
            aria-labelledby="articleLabel"
            data-placeholder="Enter the text"
            className="ProseMirror"
            style={{
              height: MIN_TEXTAREA_HEIGHT + 'px',
              overflow: 'hidden',
              transition: 'height 0.15s ease-in-out',
            }}
          />
          {formik.touched.article && formik.errors.article && (
            <div className={styles.error}>{formik.errors.article}</div>
          )}
        </div>

        <button type="submit" className={styles.submitBtn}>
          {isEditing ? 'Publish' : 'Publish Article'}
        </button>
      </div>

      <div className={styles.rightColumn}>
        <label className={styles.pickerDate}>
          Date:
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd.MM.yyyy"
            placeholderText="Select date"
          />
        </label>
      </div>
    </form>
  );
};