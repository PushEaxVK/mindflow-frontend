import { Link } from 'react-router-dom';
import styles from './PopularArticles.module.css';

function PopularArticles() {
  return (
    <div className="PopularArticles">
      <section id="popular-articles">
        <div className={styles.content}>
          <div className={styles.firstpart}>
            <h2 className={styles.title}>Popular Articles</h2>
            <Link to="/all-articles" className={styles.link}>
              <span className={styles.linkText}>Go to all Creators</span>
              <svg className={`${styles.icon} icon-Icon-2`}>
                <use xlinkHref="/symbol-defs.svg#icon-Icon-2" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PopularArticles;
