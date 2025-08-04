import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '../../components/Container/Container';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <section className={styles.container}>
      <Helmet>
        <title>Register | Harmoniq</title>
      </Helmet>
      <Container>
        <RegisterForm />
      </Container>
    </section>
  );
};

export default RegisterPage;
