import Container from '../../components/Container/Container';
import css from './MyProfilePage.module.css';
import ArticlesList from '../../components/ArticlesList/ArticlesList.jsx';
import LoadMore from '../../components/LoadMore/LoadMore.jsx';

const AuthorsPage = () => {
  return (
    <section>
      <Container>
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
        <ArticlesList
          icon={'icon-favorite-article'}
          btnStyle={'FavoriteArticle'}
        />
        <LoadMore />
      </Container>
    </section>
  );
};

export default AuthorsPage;
