import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './TopCreators.module.css';
import CreatorCard from '../CreatorCard/CreatorCard.jsx';

function TopCreators() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    fetch('/harmoniq') // Замінити на бекенд-ендпоінт
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        const sorted = data
          .sort((a, b) => b.articlesAmount - a.articlesAmount)
          .slice(0, 6);
        setCreators(sorted);
      })
      .catch((err) => console.error('Failed to load creators:', err));
  }, []);

  return (
    <section className={styles.TopCreators}>
      <div className={styles.content}>
        <div className={styles.firstpart}>
          <h2 className={styles.title}>Top Creators</h2>
          <Link to="/all-creators" className={styles.link}>
            <span className={styles.linkText}>Go to all Creators</span>
            <svg className={`${styles.icon} icon-Icon-2`}>
              <use xlinkHref="/symbol-defs.svg#icon-Icon-2" />
            </svg>
          </Link>
        </div>
        <ul className={styles.creatorsGrid}>
          {creators.map((creator) => (
            <li key={creator.id || creator.name}>
              <CreatorCard creator={creator} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TopCreators;
