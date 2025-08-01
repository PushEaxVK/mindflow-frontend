import css from './ArticlesItem.module.css';
import { Link } from 'react-router-dom';

const ArticlesItem = ({ item, icon, btnStyle }) => {
  return (
    <li className={css.articlesItem}>
      <img className={css.imgArticle} src={item.img} alt={item.title} />
      <div className={css.infoArticle}>
        <p className={css.authorArticle}>{item.ownerId}</p>
        <p className={css.title}>{item.title}</p>
        <p className={css.desc}>
          {item.desc?.length > 180
            ? item.desc.slice(0, 180) + '...'
            : item.desc || 'No description'}
        </p>
      </div>
      <div className={css.navButton}>
        <Link
          to={`/articles/${item._id}`}
          className={css.btnLearnMore}
          aria-label="Learn more"
        >
          Learn more
        </Link>
        <button className={css[`btn${btnStyle}`]} type="button">
          <svg className={css[`svgIcon${btnStyle}`]}>
            <use href={`/icons-profileArticles.svg#${icon}`}></use>
          </svg>
        </button>
      </div>
    </li>
  );
};

export default ArticlesItem;
