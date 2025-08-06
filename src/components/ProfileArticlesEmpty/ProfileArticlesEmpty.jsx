import css from './ProfileArticlesEmpty.module.css';
import { Link } from 'react-router-dom';

const ProfileArticlesEmpty = () => {
  return (
    <div className={css.boxArticlesEmpty}>
      <div className={css.boxSvgIconAlert}>
        <svg className={css.svgIconAlert}>
          <use href="/icons-profileArticles.svg#icon-alert"></use>
        </svg>
      </div>
      <h3 className={css.subTitleAlert}>Nothing found.</h3>
      <p className={css.textAlert}>Write your first article</p>
      <div className={css.btnCreateArticle}>
        <Link className={css.btnText} to="/create">
          Create an article
        </Link>
      </div>
    </div>
  );
};

export default ProfileArticlesEmpty;
