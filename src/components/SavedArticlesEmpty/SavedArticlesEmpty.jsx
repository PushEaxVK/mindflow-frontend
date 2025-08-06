import css from './SavedArticlesEmpty.module.css';
import { Link } from 'react-router-dom';

const SavedArticlesEmpty = () => {
  return (
    <div className={css.boxArticlesEmpty}>
      <div className={css.boxSvgIconAlert}>
        <svg className={css.svgIconAlert}>
          <use href="/icons-profileArticles.svg#icon-alert"></use>
        </svg>
      </div>
      <h3 className={css.subTitleAlert}>Nothing found.</h3>
      <p className={css.textAlert}>Save your first article</p>
      <div className={css.btnCreateArticle}>
        <Link className={css.btnText} to="/articles">
          Go to articles
        </Link>
      </div>
    </div>
  );
};

export default SavedArticlesEmpty;
