import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './TopCreators.module.css';
import CreatorCard from '../CreatorCard/CreatorCard';
import Container from '../Container/Container.jsx';
import { useSelector } from 'react-redux';
import { selectLoadingArticles } from '../../redux/articles/selectors';

function TopCreators() {
  const [creators, setCreators] = useState(() => {
    // одразу беремо з кешу (якщо є)
    const cached = localStorage.getItem('topCreators');
    return cached ? JSON.parse(cached) : [];
  });

  const [loadingLocal, setLoadingLocal] = useState(creators.length === 0);
  const loading = useSelector(selectLoadingArticles);

  useEffect(() => {
    const fetchPopularUsers = async () => {
      try {
        const res = await fetch(
          'https://mindflow-backend-iwk7.onrender.com/users/popular'
        );
        if (!res.ok) throw new Error('Failed to fetch popular users');
        const data = await res.json();
        const popularUsers = data.data?.users || [];

        const top6 = popularUsers.slice(0, 6);
        setCreators(top6);
        setLoadingLocal(false); // тепер використовується
      } catch (error) {
        console.error('Error loading popular users:', error);
        setLoadingLocal(false);
      }
    };

    fetchPopularUsers();
  }, []);

  return (
    <section className={styles.TopCreators}>
      <Container noVerticalPadding>
        <div className={styles.content}>
          <div className={styles.firstpart}>
            <h2 className={styles.title}>Top Creators</h2>
            <Link to="/authors" className={styles.link}>
              <span className={styles.linkText}>Go to all Creators</span>
              <svg className={`${styles.icon} icon-Icon-2`}>
                <use xlinkHref="/symbol-defs.svg#icon-Icon-2" />
              </svg>
            </Link>
          </div>
          {loading || (loadingLocal && creators.length === 0) ? (
            <p>Loading popular creators...</p>
          ) : creators.length === 0 ? (
            <p>No popular creators found.</p>
          ) : (
            <ul className={styles.creatorsGrid}>
              {creators.map((creator) => (
                <li key={creator.id || creator.name}>
                  <CreatorCard creator={creator} page="home" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}

export default TopCreators;
