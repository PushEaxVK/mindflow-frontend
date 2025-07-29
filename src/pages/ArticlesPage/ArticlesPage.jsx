import Container from '../../components/Container/Container';
import css from './ArticlesPage.module.css';
import ArticlesDropdown from '../../components/ArticlesDropdown/ArticlesDropdown';
import ArticlesList from '../../components/ArticlesList/ArticlesList';
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

const ArticlesPage = () => {
  const articles = useSelector(selectAllArticles);
  //console.log('ARTICLES:', articles);
  const loading = useSelector(selectLoadingArticles);
  const error = useSelector(selectErrorArticles);
  const total = useSelector(selectTotal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllArticles()); // початкове завантаження
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchAllArticles('/articles/popular'));
  // }, [dispatch]);

  const handleFilterChange = (selectedOption) => {
    const value = selectedOption.value;
    const endpoint =
      value === 'popular' ? '/articles/popular?limit=12' : '/articles?limit=12';
    dispatch(fetchAllArticles(endpoint));
  };
  return (
    <section>
      <Container>
        <h1 className={css.profileTitle}>Articles</h1>
        <div className={css.boxSelect}>
          <div>
            <p className={css.countArticles}>
              {total} {total === 1 ? 'article' : 'articles'}
            </p>
          </div>
          <div className={css.formSelect}>
            <ArticlesDropdown onChangeFilter={handleFilterChange} />
          </div>
        </div>
        <ArticlesList
          icon={'icon-favorite-article'}
          btnStyle={'FavoriteArticleNotSaved'}
          queryArticles={articles}
        />
        <LoadMore />
      </Container>
    </section>
  );
};

export default ArticlesPage;
