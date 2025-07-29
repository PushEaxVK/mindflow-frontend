import { Link } from 'react-router-dom';
import styles from './PopularArticles.module.css';
import ArticlesList from '../ArticlesList/ArticlesList';
import React, { useEffect, useState } from 'react';

function PopularArticles() {
  const [articles, setArticles] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    fetch('https://mindflow-backend-iwk7.onrender.com/articles/popular') // замінити на бекенд-ендпоінт
      .then((res) => res.json())
      .then((data) => {
        const articlesToShow = window.innerWidth < 1440 ? 4 : 3;
        const sorted = data
          .sort((a, b) => b.rate - a.rate)
          .slice(0, articlesToShow);
        setArticles(sorted);
      })
      .catch((err) => console.error('Failed to load articles:', err));

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch('https://mindflow-backend-iwk7.onrender.com/articles/popular')
      .then((res) => res.json())
      .then((data) => {
        const articlesToShow = windowWidth < 1440 ? 4 : 3;
        const sorted = data
          .sort((a, b) => b.rate - a.rate)
          .slice(0, articlesToShow);
        setArticles(sorted);
      })
      .catch((err) => console.error('Failed to load articles:', err));
  }, [windowWidth]);

  return (
    <section id="popular-articles" className="PopularArticles">
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
        <ul className={styles.articlesGrid}>
          <li>
            <ArticlesList
              queryArticles={articles}
              icon={'icon-favorite-article'}
              btnStyle={'FavoriteArticle'}
            />
          </li>
        </ul>
      </div>
    </section>
  );
}

export default PopularArticles;
