import Container from '../../components/Container/Container';
import css from './ArticlesPage.module.css';
import ArticlesDropdown from '../../components/ArticlesDropdown/ArticlesDropdown';
import ArticlesList from '../../components/ArticlesList/ArticlesList';
import LoadMore from '../../components/LoadMore/LoadMore';
import { useEffect, useState } from 'react';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('https://mindflow-backend-iwk7.onrender.com/articles/popular')
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b.rate - a.rate);
        setArticles(sorted);
      })
      .catch((err) => console.error('Failed to load articles:', err));
  }, []);

  return (
    <section>
      <Container>
        <h1 className={css.profileTitle}>Articles</h1>
        <div className={css.boxSelect}>
          <div>
            <p className={css.countArticles}>96 articles</p>
          </div>
          <div className={css.formSelect}>
            <ArticlesDropdown />
          </div>
        </div>
        <ArticlesList
          icon={'icon-favorite-article'}
          btnStyle={'FavoriteArticleNotSaved'}
          queryArticles={articles}
        />
        <LoadMore />
      </Container>
    </section>
  );
};

export default ArticlesPage;
