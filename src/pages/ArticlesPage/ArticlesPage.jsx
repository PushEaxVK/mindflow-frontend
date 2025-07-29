import Container from '../../components/Container/Container';
import css from './ArticlesPage.module.css';
import ArticlesDropdown from '../../components/ArticlesDropdown/ArticlesDropdown';
import ArticlesList from '../../components/ArticlesList/ArticlesList';
import LoadMore from '../../components/LoadMore/LoadMore';

const ArticlesPage = () => {
  return (
    <section>
      <Container>
        <h1 className={css.profileTitle}>Articles</h1>
        <div className={css.boxSelect}>
          <div>
            <p className={css.countArticles}>96 articles</p>
          </div>
          <div className={css.formSelect}>
            <ArticlesDropdown />
          </div>
        </div>
        <ArticlesList
          icon={'icon-favorite-article'}
          btnStyle={'FavoriteArticleNotSaved'}
        />
        <LoadMore />
      </Container>
    </section>
  );
};

export default ArticlesPage;
