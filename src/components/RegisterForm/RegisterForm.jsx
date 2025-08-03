// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { Link, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import serviceApi from '../../services/api';
// import styles from './RegisterForm.module.css';

// const validationSchema = Yup.object({
//   name: Yup.string()
//     .min(2, 'Name must be at least 2 characters')
//     .max(32, 'Name must be no more than 32 characters')
//     .required('Name is required'),
//   email: Yup.string()
//     .email('Invalid email')
//     .max(64, 'Email must be no more than 64 characters')
//     .required('Email is required'),
//   password: Yup.string()
//     .min(8, 'Password must be at least 8 characters')
//     .max(64, 'Password must be no more than 64 characters')
//     .matches(
//       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/,
//       'Password must include letter, number, and special character'
//     )
//     .required('Password is required'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match')
//     .required('Please confirm your password'),
// });

// const RegisterForm = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const togglePassword = () => setShowPassword((prev) => !prev);
//   const toggleConfirm = () => setShowConfirm((prev) => !prev);

//   const handleSubmit = async (values, actions) => {
//     try {
//       const response = await serviceApi.auth.signup({
//         name: values.name,
//         email: values.email,
//         password: values.password,
//       });

//       toast.success(`Welcome, ${response.data.user.name}!`);
//       actions.resetForm();
//       navigate('/upload-photo');
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Registration failed');
//     } finally {
//       actions.setSubmitting(false);
//     }
//   };

//   return (
//     <div className={styles.formWrapper}>
//       <h2>Register</h2>
//       <p className={styles.description}>
//         <span className={styles.line}>Join our community of mindfulness</span>
//         <span className={styles.line}>and wellbeing!</span>
//       </p>
//       <Formik
//         initialValues={{
//           name: '',
//           email: '',
//           password: '',
//           confirmPassword: '',
//         }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form className={styles.form} autoComplete="off">
//             <div className={styles.fieldWrapper}>
//               <label htmlFor="name-field">Name</label>
//               <Field
//                 id="name-field"
//                 name="name"
//                 type="text"
//                 placeholder="Max"
//                 className={`${styles.inputWithIcon}`}
//               />
//               <ErrorMessage
//                 name="name"
//                 component="span"
//                 className={styles.error}
//               />
//             </div>
//             <div className={styles.fieldWrapper}>
//               <label htmlFor="email-field">Email address</label>
//               <Field
//                 id="email-field"
//                 name="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 className={`${styles.inputWithIcon}`}
//               />
//               <ErrorMessage
//                 name="email"
//                 component="span"
//                 className={styles.error}
//               />
//             </div>
//             <div className={styles.fieldWrapper}>
//               <label htmlFor="password-field">Create a strong password</label>
//               <div className={styles.passwordWrapper}>
//                 <Field
//                   id="password-field"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="Password"
//                   className={`${styles.inputWithIcon}`}
//                 />
//                 <button
//                   type="button"
//                   className={styles.iconWrapper}
//                   onClick={togglePassword}
//                   aria-label={showPassword ? 'Hide password' : 'Show password'}
//                 >
//                   <svg
//                     className={styles.icon}
//                     width="24"
//                     height="24"
//                     aria-hidden="true"
//                   >
//                     <use
//                       xlinkHref={
//                         showPassword
//                           ? '/eyes-sprite.svg#icon-eye-stroke-32'
//                           : '/eyes-sprite.svg#icon-eye-crossed-stroke-32'
//                       }
//                     />
//                   </svg>
//                 </button>
//               </div>
//               <ErrorMessage
//                 name="password"
//                 component="span"
//                 className={styles.error}
//               />
//             </div>
//             <div className={styles.fieldWrapper}>
//               <label htmlFor="confirmPassword-field">
//                 Repeat your password
//               </label>
//               <div className={styles.passwordWrapper}>
//                 <Field
//                   id="confirmPassword-field"
//                   name="confirmPassword"
//                   type={showConfirm ? 'text' : 'password'}
//                   placeholder="Repeat password"
//                   className={`${styles.inputWithIcon}`}
//                 />
//                 <button
//                   type="button"
//                   className={styles.iconWrapper}
//                   onClick={toggleConfirm}
//                   aria-label={showConfirm ? 'Hide password' : 'Show password'}
//                 >
//                   <svg
//                     className={styles.icon}
//                     width="24"
//                     height="24"
//                     aria-hidden="true"
//                   >
//                     <use
//                       xlinkHref={
//                         showConfirm
//                           ? '/eyes-sprite.svg#icon-eye-stroke-32'
//                           : '/eyes-sprite.svg#icon-eye-crossed-stroke-32'
//                       }
//                     />
//                   </svg>
//                 </button>
//               </div>
//               <ErrorMessage
//                 name="confirmPassword"
//                 component="span"
//                 className={styles.error}
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={styles.btn}
//             >
//               Create account
//             </button>
//           </Form>
//         )}
//       </Formik>

//       <p className={styles.login}>
//         Already have an account? <Link to="/login">Log in</Link>
//       </p>
//     </div>
//   );
// };

// export default RegisterForm;

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import serviceApi from '../../services/api';
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
                className={styles.inputWithIcon}
              />
              <div className={styles.errorContainer}>
                <ErrorMessage
                  name="name"
                  component="span"
                  className={styles.error}
                />
              </div>
            </div>

            <div className={styles.fieldWrapper}>
              <label htmlFor="email-field">Email address</label>
              <Field
                id="email-field"
                name="email"
                type="email"
                placeholder="you@example.com"
                className={styles.inputWithIcon}
              />
              <div className={styles.errorContainer}>
                <ErrorMessage
                  name="email"
                  component="span"
                  className={styles.error}
                />
              </div>
            </div>

            <div className={styles.fieldWrapper}>
              <label htmlFor="password-field">Create a strong password</label>
              <div className={styles.passwordWrapper}>
                <Field
                  id="password-field"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className={styles.inputWithIcon}
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
              <div className={styles.errorContainer}>
                <ErrorMessage
                  name="password"
                  component="span"
                  className={styles.error}
                />
              </div>
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
                  className={styles.inputWithIcon}
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
              <div className={styles.errorContainer}>
                <ErrorMessage
                  name="confirmPassword"
                  component="span"
                  className={styles.error}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${styles.btn} ${isSubmitting ? styles.loading : ''}`}
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
  );
};

export default RegisterForm;

// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { Link, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import serviceApi from '../../services/api';
// import styles from './RegisterForm.module.css';

// const validationSchema = Yup.object({
//   name: Yup.string()
//     .min(2, 'Minimum 2 characters')
//     .max(32, 'Up to 32 characters')
//     .required('Name is required'),
//   email: Yup.string()
//     .email('Invalid email')
//     .max(64, 'Up to 64 characters')
//     .required('Email is required'),
//   password: Yup.string()
//     .min(8, 'At least 8 characters')
//     .max(64, 'Password up to 64 characters')
//     .matches(
//       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/,
//       'Use letters, numbers, and symbols'
//     )
//     .required('Password is required'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match')
//     .required('Confirm password'),
// });

// const RegisterForm = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const togglePassword = () => setShowPassword((prev) => !prev);
//   const toggleConfirm = () => setShowConfirm((prev) => !prev);

//   const handleSubmit = async (values, actions) => {
//     try {
//       const response = await serviceApi.auth.signup({
//         name: values.name,
//         email: values.email,
//         password: values.password,
//       });
//       toast.success(`Welcome, ${response.data.user.name}!`);
//       actions.resetForm();
//       navigate('/upload-photo');
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Registration failed');
//     } finally {
//       actions.setSubmitting(false);
//     }
//   };

//   return (
//     <div className={`container ${styles.formWrapper}`}>
//       <h2>Register</h2>
//       <p className={styles.description}>
//         <span className={styles.line}>Join our community of mindfulness</span>
//         <span className={styles.line}>and wellbeing!</span>
//       </p>

//       <Formik
//         initialValues={{
//           name: '',
//           email: '',
//           password: '',
//           confirmPassword: '',
//         }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form className={styles.form} autoComplete="off">
//             <div className={styles.fieldWrapper}>
//               <label htmlFor="name-field">Name</label>
//               <Field
//                 id="name-field"
//                 name="name"
//                 type="text"
//                 placeholder="Max"
//                 className={styles.inputWithIcon}
//               />
//               <div className={styles.errorContainer}>
//                 <ErrorMessage
//                   name="name"
//                   component="span"
//                   className={styles.error}
//                 />
//               </div>
//             </div>

//             <div className={styles.fieldWrapper}>
//               <label htmlFor="email-field">Email address</label>
//               <Field
//                 id="email-field"
//                 name="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 className={styles.inputWithIcon}
//               />
//               <div className={styles.errorContainer}>
//                 <ErrorMessage
//                   name="email"
//                   component="span"
//                   className={styles.error}
//                 />
//               </div>
//             </div>

//             <div className={styles.fieldWrapper}>
//               <label htmlFor="password-field">
//                 Create a strong password *********
//               </label>
//               <div className={styles.passwordWrapper}>
//                 <Field
//                   id="password-field"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="Password"
//                   className={styles.inputWithIcon}
//                 />
//                 <button
//                   type="button"
//                   className={styles.iconWrapper}
//                   onClick={togglePassword}
//                   aria-label="Toggle password"
//                 >
//                   <svg
//                     width="25"
//                     height="25"
//                     viewBox="0 0 25 25"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                     stroke="#070721"
//                     strokeWidth="1"
//                   >
//                     <path
//                       d="M14.9107 17.4874C14.0963 17.8656 13.1923 18.1118 12.2405 18.1118C8.65598 18.1118 5.75017 14.6207 5.75017 13.7336C5.75017 13.2308 6.68382 11.8913 8.14549 10.8252M17.952 15.1367C18.4487 14.5391 18.7308 14.01 18.7308 13.7336C18.7308 12.8466 15.825 9.35549 12.2405 9.35549C13.8177 9.35549 15.0962 10.6238 15.0962 12.1884M12.2405 15.0213C10.6633 15.0213 9.38472 13.753 9.38472 12.1884M19.25 9.35557C17.2732 7.7195 14.9653 6.7802 12.5001 6.7802C11.6116 6.7802 10.7435 6.90222 9.90397 7.13492M5.75017 9.35557C5.93341 9.20392 6.1195 9.05825 6.3083 8.91876M5.75 5.75L18.2856 18.4061"
//                       strokeLinecap="round"
//                     />
//                   </svg>
//                 </button>
//               </div>
//               <div className={styles.errorContainer}>
//                 <ErrorMessage
//                   name="password"
//                   component="span"
//                   className={styles.error}
//                 />
//               </div>
//             </div>

//             <div className={styles.fieldWrapper}>
//               <label htmlFor="confirmPassword-field">
//                 Repeat your password *********
//               </label>
//               <div className={styles.passwordWrapper}>
//                 <Field
//                   id="confirmPassword-field"
//                   name="confirmPassword"
//                   type={showConfirm ? 'text' : 'password'}
//                   placeholder="Repeat password"
//                   className={styles.inputWithIcon}
//                 />
//                 <button
//                   type="button"
//                   className={styles.iconWrapper}
//                   onClick={toggleConfirm}
//                   aria-label="Toggle password"
//                 >
//                   <svg
//                     width="15"
//                     height="14"
//                     viewBox="0 0 15 14"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                     stroke="#070721"
//                     strokeWidth="1"
//                   >
//                     <path
//                       d="M9.91071 12.4874C9.09629 12.8656 8.19231 13.1118 7.24048 13.1118C3.65598 13.1118 0.750171 9.62068 0.750171 8.73362C0.750171 8.2308 1.68382 6.89131 3.14549 5.82521M12.952 10.1367C13.4487 9.53913 13.7308 9.00999 13.7308 8.73362C13.7308 7.84656 10.825 4.35549 7.24048 4.35549C8.81767 4.35549 10.0962 5.62382 10.0962 7.1884M7.24046 10.0213C5.66328 10.0213 4.38472 8.75297 4.38472 7.1884M14.25 4.35557C12.2732 2.7195 9.96525 1.7802 7.5001 1.7802C6.61158 1.7802 5.7435 1.90222 4.90397 2.13492M0.750171 4.35557C0.933414 4.20392 1.1195 4.05825 1.3083 3.91876M0.75 0.75L13.2856 13.4061"
//                       strokeLinecap="round"
//                     />
//                   </svg>
//                 </button>
//               </div>
//               <div className={styles.errorContainer}>
//                 <ErrorMessage
//                   name="confirmPassword"
//                   component="span"
//                   className={styles.error}
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`${styles.btn} ${isSubmitting ? styles.loading : ''}`}
//             >
//               {isSubmitting ? 'Creating...' : 'Create account'}
//             </button>
//           </Form>
//         )}
//       </Formik>

//       <p className={styles.login}>
//         Already have an account? <Link to="/login">Log in</Link>
//       </p>
//     </div>
//   );
// };

// export default RegisterForm;
