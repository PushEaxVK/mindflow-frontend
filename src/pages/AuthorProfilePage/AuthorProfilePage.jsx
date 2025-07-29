import ArticlesList from '../../components/ArticlesList/ArticlesList';
import css from './AuthorProfilePage.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import Container from '../../components/Container/Container';
import { useLocation, useMatch } from 'react-router-dom';
import clsx from 'clsx';
import LoadMore from '../../components/LoadMore/LoadMore.jsx';
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

const AuthorProfilePage = () => {
  const location = useLocation();
  const match = useMatch('/authors/:id');
  const isBaseProfile = match && location.pathname === match.pathname;

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.tabItem, isActive && css.active);
  };

  const dispatch = useDispatch();
  const allArticles = useSelector(selectAllArticles);
  const loading = useSelector(selectLoadingArticles);
  const error = useSelector(selectErrorArticles);

  console.log('Масив статтей:', allArticles);

  useEffect(() => {
    dispatch(fetchAllArticles());
  }, [dispatch]);

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
            <p className={css.countArticles}>96 articles</p>
          </li>
        </ul>
        <nav className={css.profileTabList}>
          <NavLink to="my-articles" className={buildLinkClass}>
            My Articles
          </NavLink>
          <NavLink to="saved-articles" className={buildLinkClass}>
            Saved Articles
          </NavLink>
        </nav>
        <Outlet />
        {isBaseProfile && <ArticlesList queryArticles={allArticles} />}
        <LoadMore />
      </Container>
    </section>
  );
};

export default AuthorProfilePage;
