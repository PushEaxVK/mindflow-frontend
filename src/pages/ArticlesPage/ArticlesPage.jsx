import Container from '../../components/Container/Container';
import css from './ArticlesPage.module.css';
import ArticlesDropdown from '../../components/ArticlesDropdown/ArticlesDropdown';
import ArticlesList from '../../components/ArticlesList/ArticlesList';
import LoadMore from '../../components/LoadMore/LoadMore';
import { useEffect, useState } from 'react';
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
  const currentPage = useSelector(selectPage);
  const totalPages = useSelector(selectPages);
  const [filter, setFilter] = useState('all'); // локальний фільтр

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllArticles({ page: 1, filter }));
  }, [dispatch, filter]);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleLoadMore = () => {
    console.log('Load more clicked. Current page:', currentPage);
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      console.log('Fetching next page:', nextPage, 'with filter:', filter);
      dispatch(fetchAllArticles({ page: nextPage, filter }));
    }
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
        <LoadMore
          page={currentPage}
          pages={totalPages}
          onLoadMore={handleLoadMore}
        />
      </Container>
    </section>
  );
};

export default ArticlesPage;
