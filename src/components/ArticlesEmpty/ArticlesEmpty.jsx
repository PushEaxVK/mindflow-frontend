import css from './ArticlesEmpty.module.css';
import { Link } from 'react-router-dom';

const ArticlesEmpty = () => {
  return (
    <div className={css.boxArticlesEmpty}>
      <div className={css.boxSvgIconAlert}>
        <svg className={css.svgIconAlert}>
          <use href="/icons-profileArticles.svg#icon-alert"></use>
        </svg>
      </div>
      <h3 className={css.subTitleAlert}>Nothing found.</h3>
      <p className={css.textAlert}>Be the first, who create an article</p>
      <div className={css.btnCreateArticle}>
        <Link className={css.btnText} to="/">
          Create an article
        </Link>
      </div>
    </div>
  );
};

export default ArticlesEmpty;
