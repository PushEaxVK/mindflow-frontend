import css from './ArticlesItem.module.css';
import { Link } from 'react-router-dom';
import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSavedArticles } from '../../redux/SavedArticles/selectors.js';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors.js';
import { toggleSaveArticle } from '../../redux/SavedArticles/operations.js';
import { openModal } from '../../redux/modal/slice.js';

const ArticlesItem = forwardRef(function ArticlesItem(
  { item, icon, btnStyle },
  ref
) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const savedArticles = useSelector(selectSavedArticles);
  const isSaved = Array.isArray(savedArticles)
    ? savedArticles.some((article) => article._id === item._id)
    : false;

  const handleToggleSave = () => {
    if (!isLoggedIn) {
      dispatch(openModal('ErrorSave'));
      return;
    }
    const action = isSaved ? 'REMOVE (DELETE)' : 'SAVE (POST)';
    console.log(`Toggle Save Clicked - Aktion: ${action}`);
    console.log('Artikel-ID:', item._id);
    console.log('User-ID:', user.id);

    dispatch(
      toggleSaveArticle({
        userId: user.id,
        articleId: item._id,
        isSaved,
      })
    );
  };

  return (
    <li className={css.articlesItem} ref={ref}>
      <img className={css.imgArticle} src={item.img} alt={item.title} />
      <div className={css.infoArticle}>
        <p className={css.authorArticle}>{item.ownerId?.name}</p>
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
        <button
          className={css[`btn${btnStyle}`]}
          type="button"
          onClick={handleToggleSave}
        >
          <svg className={css[`svgIcon${btnStyle}`]}>
            <use href={`/icons-profileArticles.svg#${icon}`}></use>
          </svg>
        </button>
      </div>
    </li>
  );
});

export default ArticlesItem;
