import React, { useState, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import serviceApi from '../../services/api';
import PasswordStrengthBar from './PasswordStrengthBar';
import styles from './RegisterForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Minimum 2 characters')
    .max(32, 'Up to 32 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .max(64, 'Up to 64 characters')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'At least 8 characters')
    .max(64, 'Password up to 64 characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/,
      'Use letters, numbers, and symbols'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password'),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const refs = {
    name: useRef(null),
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
  };

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirm = () => setShowConfirm((prev) => !prev);

  const handleSubmit = async (values, actions) => {
    try {
      const response = await serviceApi.auth.signup({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      toast.success(`Welcome, ${response.data.user.name}!`, {
        style: {
          animation: 'slide-in 0.4s ease',
        },
      });

      actions.resetForm();
      navigate('/photo');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed', {
        style: {
          animation: 'slide-in 0.4s ease',
        },
      });
    } finally {
      actions.setSubmitting(false);

      const errorKeys = Object.keys(actions.errors);
      if (errorKeys.length > 0) {
        const firstErrorKey = errorKeys[0];
        refs[firstErrorKey]?.current?.focus();
      }
    }
  };

  return (
    <div className="formPerspective">
      <div className={`container ${styles.formWrapper}`}>
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
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ isSubmitting, values, errors, touched }) => (
            <Form className={styles.form} autoComplete="off">
              {/* Name Field */}
              <div className={styles.fieldWrapper}>
                <label htmlFor="name-field">Enter your name</label>
                <Field name="name">
                  {({ field, meta }) => (
                    <>
                      <input
                        {...field}
                        id="name-field"
                        ref={refs.name}
                        type="text"
                        placeholder="Max"
                        autoComplete="given-name"
                        className={`${styles.inputWithIcon} ${
                          meta.touched && field.value && meta.error
                            ? styles.invalid
                            : ''
                        }`}
                      />
                      <div className={styles.errorContainer}>
                        {meta.touched && field.value && meta.error && (
                          <span className={styles.error}>{meta.error}</span>
                        )}
                      </div>
                    </>
                  )}
                </Field>
              </div>

              {/* Email Field */}
              <div className={styles.fieldWrapper}>
                <label htmlFor="email-field">Enter your email address</label>
                <Field name="email">
                  {({ field, meta }) => (
                    <>
                      <input
                        {...field}
                        id="email-field"
                        ref={refs.email}
                        type="text"
                        placeholder="you@example.com"
                        autoComplete="off"
                        className={`${styles.inputWithIcon} ${
                          meta.touched && field.value && meta.error
                            ? styles.invalid
                            : ''
                        }`}
                      />
                      <div className={styles.errorContainer}>
                        {meta.touched && field.value && meta.error && (
                          <span className={styles.error}>{meta.error}</span>
                        )}
                      </div>
                    </>
                  )}
                </Field>
              </div>

              {/* Password Field */}
              <div className={`${styles.fieldWrapper} ${styles.passwordField}`}>
                <label htmlFor="password-field">Create a strong password</label>
                <div className={styles.passwordWrapper}>
                  <Field name="password">
                    {({ field, meta }) => (
                      <>
                        <input
                          {...field}
                          id="password-field"
                          ref={refs.password}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="********"
                          autoComplete="off"
                          className={`${styles.inputWithIcon} ${
                            meta.touched && field.value && meta.error
                              ? styles.invalid
                              : ''
                          }`}
                        />
                        <button
                          type="button"
                          className={styles.iconWrapper}
                          onClick={togglePassword}
                          aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                          }
                        >
                          <svg className={styles.icon} aria-hidden="true">
                            <use
                              xlinkHref={
                                showPassword
                                  ? '/eyes-sprite.svg#icon-eye-stroke-32'
                                  : '/eyes-sprite.svg#icon-eye-crossed-stroke-32'
                              }
                            />
                          </svg>
                        </button>
                      </>
                    )}
                  </Field>
                </div>

                {/* Error */}
                <Field name="password">
                  {({ field, meta }) => (
                    <div className={styles.errorContainer}>
                      {meta.touched && field.value && meta.error && (
                        <span className={styles.error}>{meta.error}</span>
                      )}
                    </div>
                  )}
                </Field>

                {/* Password Strength */}
                <PasswordStrengthBar
                  password={values.password}
                  confirmPassword={values.confirmPassword}
                />
              </div>

              {/* Confirm Password */}
              <div
                className={`${styles.fieldWrapper} ${styles.repeatPassword}`}
              >
                <label htmlFor="confirmPassword-field">
                  Repeat your password
                </label>
                <div className={styles.passwordWrapper}>
                  <Field name="confirmPassword">
                    {({ field, meta }) => (
                      <>
                        <input
                          {...field}
                          id="confirmPassword-field"
                          ref={refs.confirmPassword}
                          type={showConfirm ? 'text' : 'password'}
                          placeholder="********"
                          autoComplete="off"
                          className={`${styles.inputWithIcon} ${
                            meta.touched && field.value && meta.error
                              ? styles.invalid
                              : ''
                          }`}
                        />
                        <button
                          type="button"
                          className={styles.iconWrapper}
                          onClick={toggleConfirm}
                          aria-label={
                            showConfirm ? 'Hide password' : 'Show password'
                          }
                        >
                          <svg className={styles.icon} aria-hidden="true">
                            <use
                              xlinkHref={
                                showConfirm
                                  ? '/eyes-sprite.svg#icon-eye-stroke-32'
                                  : '/eyes-sprite.svg#icon-eye-crossed-stroke-32'
                              }
                            />
                          </svg>
                        </button>
                      </>
                    )}
                  </Field>
                </div>
                <Field name="confirmPassword">
                  {({ field, meta }) => (
                    <div className={styles.errorContainer}>
                      {meta.touched && field.value && meta.error && (
                        <span className={styles.error}>{meta.error}</span>
                      )}
                    </div>
                  )}
                </Field>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles.btn} ${
                  isSubmitting ? styles.loading : ''
                }`}
              >
                {isSubmitting ? 'Creating...' : 'Create account'}
              </button>
            </Form>
          )}
        </Formik>

        <p className={styles.login}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
