import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './PopularArticles.module.css';
import ArticlesList from '../ArticlesList/ArticlesList';
import Container from '../../components/Container/Container';

import { fetchAllArticles } from '../../redux/articles/operation';
import {
  selectAllArticles,
  selectLoadingArticles,
} from '../../redux/articles/selectors';

function PopularArticles() {
  const dispatch = useDispatch();
  const allArticles = useSelector(selectAllArticles);
  const loading = useSelector(selectLoadingArticles);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [visibleArticles, setVisibleArticles] = useState([]);

  useEffect(() => {
    dispatch(fetchAllArticles({ page: 1, filter: 'popular' }));
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const count = windowWidth >= 1440 ? 3 : 4;
    setVisibleArticles(allArticles.slice(0, count));
  }, [windowWidth, allArticles]);

  return (
    <section id="popular-articles" className={styles.PopularArticles}>
      <Container noVerticalPadding>
        <div className={styles.content}>
          <div className={styles.firstpart}>
            <h2 className={styles.title}>Popular Articles</h2>
            <Link to="/articles" className={styles.link}>
              <span className={styles.linkText}>Go to all Articles</span>
              <svg className={`${styles.icon} icon-Icon-2`}>
                <use xlinkHref="/symbol-defs.svg#icon-Icon-2" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <p>Loading popular articles...</p>
          ) : visibleArticles.length === 0 ? (
            <p>No popular articles found.</p>
          ) : (
            <ul className={styles.articlesList}>
              <ArticlesList
                queryArticles={visibleArticles}
                icon="icon-favorite-article"
                btnStyle="FavoriteArticleNotSaved"
                className={styles.articlesGrid}
              />
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}

export default PopularArticles;
