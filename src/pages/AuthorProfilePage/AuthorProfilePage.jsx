import ArticleList from '../../components/ArticlesList/ArticleList.jsx';
import css from './AuthorProfilePage.module.css';
import { NavLink, Outlet } from 'react-router-dom';

const AuthorProfilePage = () => {
  return (
    <section class="section_AuthorProfilePage">
      <div className={'container'}>
        <h2>My Profile</h2>
        <ul class="profileList">
          <li>
            <img
              class="imgProfile"
              src="https://res.cloudinary.com/dfoiy9rn5/image/upload/v1753462124/profile_img_lhcerd.png"
              alt=""
            />
          </li>
          <li>
            <p class="userName">Naomi</p>
            <p class="countArticles">96 articles</p>
          </li>
        </ul>
        <ul class="profileTabList">
          <li>
            <a href="#" class="tabItem active">
              My Articles
            </a>
          </li>
          <li>
            <a href="#" class="tabItem">
              Saved Articles
            </a>
          </li>
        </ul>
        <nav>
          <NavLink to="my-articles">My Articles</NavLink>
          <NavLink to="saved-articles">Saved Articles</NavLink>
        </nav>
        <Outlet />
        <ArticleList />
      </div>
    </section>
  );
};

export default AuthorProfilePage;
