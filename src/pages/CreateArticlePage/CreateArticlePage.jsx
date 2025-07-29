import React from 'react';
import { AddArticleForm } from '../../components/AddArticleForm/AddArticleForm';
import styles from './CreateArticlePage.module.css';
import Container from '../../components/Container/Container';

const CreateArticlePage = () => {
  return (
    <section className={styles.pageWrapper}>
      <Container>
        <h1 className={styles.heading}>Create an article</h1>
        <AddArticleForm />
      </Container>
    </section>
  );
};

export default CreateArticlePage;
