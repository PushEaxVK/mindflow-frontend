import ArticlesList from '../../components/ArticlesList/ArticleList.jsx';
import css from './AuthorProfilePage.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import Container from '../../components/Container/Container';
import { useLocation, useMatch } from 'react-router-dom';

const AuthorProfilePage = () => {
  const location = useLocation();
  const match = useMatch('/authors/:id');
  const isBaseProfile = match && location.pathname === match.pathname;
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
          <NavLink to="my-articles" className={css.tabItem}>
            My Articles
          </NavLink>
          <NavLink to="saved-articles" className={css.tabItem}>
            Saved Articles
          </NavLink>
        </nav>
        <Outlet />
        {isBaseProfile && <ArticlesList />}
      </Container>
    </section>
  );
};

export default AuthorProfilePage;
