import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import serviceApi from '../../services/api';
import styles from './RegisterForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(32, 'Name must be no more than 32 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .max(64, 'Email must be no more than 64 characters')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be no more than 64 characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/,
      'Password must include letter, number, and special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirm = () => setShowConfirm((prev) => !prev);

  const handleSubmit = async (values, actions) => {
    try {
      const response = await serviceApi.auth.signup({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      toast.success(`Welcome, ${response.data.user.name}!`);
      actions.resetForm();
      navigate('/upload-photo');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Register</h2>
      <p className={styles.description}>
        <span className={styles.line}>Join our community of mindfulness</span>
        <span className={styles.line}>and wellbeing!</span>
      </p>
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
        {({ isSubmitting }) => (
          <Form className={styles.form} autoComplete="off">
            <div className={styles.fieldWrapper}>
              <label htmlFor="name-field">Name</label>
              <Field
                id="name-field"
                name="name"
                type="text"
                placeholder="Max"
                className={`${styles.inputWithIcon}`}
              />
              <ErrorMessage
                name="name"
                component="span"
                className={styles.error}
              />
            </div>
            <div className={styles.fieldWrapper}>
              <label htmlFor="email-field">Email address</label>
              <Field
                id="email-field"
                name="email"
                type="email"
                placeholder="you@example.com"
                className={`${styles.inputWithIcon}`}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={styles.error}
              />
            </div>
            <div className={styles.fieldWrapper}>
              <label htmlFor="password-field">Create a strong password</label>
              <div className={styles.passwordWrapper}>
                <Field
                  id="password-field"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className={`${styles.inputWithIcon}`}
                />
                <button
                  type="button"
                  className={styles.iconWrapper}
                  onClick={togglePassword}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <svg
                    className={styles.icon}
                    width="24"
                    height="24"
                    aria-hidden="true"
                  >
                    <use
                      xlinkHref={
                        showPassword
                          ? '/eyes-sprite.svg#icon-eye-stroke-32'
                          : '/eyes-sprite.svg#icon-eye-crossed-stroke-32'
                      }
                    />
                  </svg>
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="span"
                className={styles.error}
              />
            </div>
            <div className={styles.fieldWrapper}>
              <label htmlFor="confirmPassword-field">
                Repeat your password
              </label>
              <div className={styles.passwordWrapper}>
                <Field
                  id="confirmPassword-field"
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Repeat password"
                  className={`${styles.inputWithIcon}`}
                />
                <button
                  type="button"
                  className={styles.iconWrapper}
                  onClick={toggleConfirm}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  <svg
                    className={styles.icon}
                    width="24"
                    height="24"
                    aria-hidden="true"
                  >
                    <use
                      xlinkHref={
                        showConfirm
                          ? '/eyes-sprite.svg#icon-eye-stroke-32'
                          : '/eyes-sprite.svg#icon-eye-crossed-stroke-32'
                      }
                    />
                  </svg>
                </button>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="span"
                className={styles.error}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.btn}
            >
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
};

export default RegisterForm;
