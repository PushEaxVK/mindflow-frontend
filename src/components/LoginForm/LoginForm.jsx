import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../redux/auth/operations';
import s from './LoginForm.module.css';

import EyeOpenMobile from './icons/eye-open-mob.svg';
import EyeClosedMobile from './icons/eye-closed-mob.svg';
import EyeOpenTablet from './icons/eye-open-tab.svg';
import EyeClosedTablet from './icons/eye-closed-tab.svg';
import EyeOpenDesktop from './icons/eye-open-desk.svg';
import EyeClosedDesktop from './icons/eye-closed-desk.svg';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .max(64, 'Email can contain maximum 64 characters')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password can contain maximum 64 characters')
    .required('Password is required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await dispatch(login(values));

      if (login.fulfilled.match(result)) {
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Login</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={s.form}>
            <div className={s.fieldWrapper}>
              <label className={s.label}>Enter your email address</label>
              <Field
                type="email"
                name="email"
                placeholder="email@gmail.com"
                className={s.field}
              />
              <div className={s.errorContainer}>
                <ErrorMessage
                  name="email"
                  component="div"
                  className={s.error}
                />
              </div>
            </div>

            <div className={s.fieldWrapper}>
              <label className={s.label}>Enter a password</label>
              <div className={s.passwordContainer}>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="*********"
                  className={s.field}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={s.passwordToggle}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <>
                      <img
                        src={EyeOpenMobile}
                        alt=""
                        className={`${s.icon} ${s.iconMobile}`}
                      />
                      <img
                        src={EyeOpenTablet}
                        alt=""
                        className={`${s.icon} ${s.iconTablet}`}
                      />
                      <img
                        src={EyeOpenDesktop}
                        alt=""
                        className={`${s.icon} ${s.iconDesktop}`}
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={EyeClosedMobile}
                        alt=""
                        className={`${s.icon} ${s.iconMobile}`}
                      />
                      <img
                        src={EyeClosedTablet}
                        alt=""
                        className={`${s.icon} ${s.iconTablet}`}
                      />
                      <img
                        src={EyeClosedDesktop}
                        alt=""
                        className={`${s.icon} ${s.iconDesktop}`}
                      />
                    </>
                  )}
                </button>
              </div>
              <div className={s.errorContainer}>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={s.error}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${s.submitButton} ${isSubmitting ? s.loading : ''}`}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>

            <div className={s.linkWrapper}>
              <span>Don't have an account?</span>
              <Link to="/register" className={s.link}>
                Register
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
