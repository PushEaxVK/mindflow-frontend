import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PasswordStrengthBar from './PasswordStrengthBar';
import serviceApi from '../../services/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './RegisterForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

// ...existing code...

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirm = () => setShowConfirm(!showConfirm);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await serviceApi.auth.signup({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      toast.success(`Welcome, ${response.data.user.name}!`);
      navigate('/upload-photo');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Register</h2>
      <p>Join our community of mindfulness and wellbeing!</p>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, errors, touched, submitCount }) => (
          <Form className={styles.form}>
            <div className={styles.fieldWrapper}>
              <label htmlFor="name">Enter your name</label>
              <Field id="name" type="text" name="name" />
              {(touched.name || submitCount > 0) && errors.name && (
                <div className={styles.error}>{errors.name}</div>
              )}
            </div>

            <div className={styles.fieldWrapper}>
              <label htmlFor="email">Enter your email address</label>
              <Field id="email" type="email" name="email" />
              {(touched.email || submitCount > 0) && errors.email && (
                <div className={styles.error}>{errors.email}</div>
              )}
            </div>

            <div className={styles.fieldWrapper}>
              <label htmlFor="password">Create a strong password</label>
              <div className={styles.passwordWrapper}>
                <Field
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className={styles.inputWithIcon}
                  style={{ paddingRight: '40px' }}
                />
                <span
                  className={styles.iconWrapper}
                  onClick={togglePassword}
                  tabIndex={0}
                  role="button"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {(touched.password || submitCount > 0) && errors.password && (
                <div className={styles.error}>{errors.password}</div>
              )}
            </div>

            <div className={styles.fieldWrapper}>
              <label htmlFor="confirmPassword">Repeat your password</label>
              <div className={styles.passwordWrapper}>
                <Field
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  className={styles.inputWithIcon}
                  style={{ paddingRight: '40px' }}
                />
                <span
                  className={styles.iconWrapper}
                  onClick={toggleConfirm}
                  tabIndex={0}
                  role="button"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {(touched.confirmPassword || submitCount > 0) && errors.confirmPassword && (
                <div className={styles.error}>{errors.confirmPassword}</div>
              )}
            </div>
            <button type="submit" disabled={isSubmitting}>
              Create account
            </button>
          </Form>
        )}
      </Formik>

      <p className={styles.login}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default RegisterForm;
