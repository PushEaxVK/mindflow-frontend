import ArticlesList from '../../components/ArticlesList/ArticlesList';
import css from './AuthorProfilePage.module.css';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Container from '../../components/Container/Container';
import { useLocation, useMatch, useParams } from 'react-router-dom';
import clsx from 'clsx';
import LoadMore from '../../components/LoadMore/LoadMore';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllArticles } from '../../redux/articles/operation';
import {
  selectAllArticles,
  selectLoadingArticles,
  selectErrorArticles,
  selectPage,
  selectPages,
  selectTotal,
} from '../../redux/articles/selectors';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';

const AuthorProfilePage = () => {
  const location = useLocation();
  const match = useMatch('/authors/:id');
  const isBaseProfile = match && location.pathname === match.pathname;

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.tabItem, isActive && css.active);
  };

  const dispatch = useDispatch();
  const articles = useSelector(selectAllArticles);
  const loading = useSelector(selectLoadingArticles);
  const error = useSelector(selectErrorArticles);
  const total = useSelector(selectTotal);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  //console.log('Масив статтей:', allArticles);

  const { id: authorId } = useParams();

  useEffect(() => {
    if (authorId) {
      dispatch(fetchAllArticles({ page: 1, filter: `author=${authorId}` }));
    }
  }, [authorId, dispatch]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && isBaseProfile) {
      navigate('my-articles', { replace: true });
    }
  }, [isBaseProfile, navigate]);

  return (
    <section className={css.section_AuthorProfilePage}>
      <Container>
        <h1 className={css.profileTitle}>My Profile</h1>
        <ul className={css.profileList}>
          <li>
            <img
              className={css.imgProfile}
              src="https://res.cloudinary.com/dfoiy9rn5/image/upload/v1753462124/profile_img_lhcerd.png"
              alt=""
            />
          </li>
          <li>
            <p className={css.userName}>Naomi</p>
            <p className={css.countArticles}>{`${total} articles`}</p>
          </li>
        </ul>
        {isLoggedIn && (
          <nav className={css.profileTabList}>
            <NavLink to="my-articles" className={buildLinkClass}>
              My Articles
            </NavLink>
            <NavLink to="saved-articles" className={buildLinkClass}>
              Saved Articles
            </NavLink>
          </nav>
        )}
        <Outlet />
        {isBaseProfile && (
          <ArticlesList
            icon={'icon-favorite-article'}
            btnStyle={'FavoriteArticleNotSaved'}
            queryArticles={articles}
          />
        )}
        <LoadMore />
      </Container>
    </section>
  );
};

export default AuthorProfilePage;
