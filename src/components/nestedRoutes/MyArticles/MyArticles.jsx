import ArticlesList from '../../ArticlesList/ArticlesList';
import ProfileArticlesEmpty from '../../ProfileArticlesEmpty/ProfileArticlesEmpty';

import LoadMore from '../../LoadMore/LoadMore';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticlesAuthorById } from '../../../redux/user/operation.js';
import {
  selectAuthorArticles,
  selectAuthorArticlesPage,
  selectAuthorArticlesPages,
  selectAuthorArticlesLoading,
  selectAuthorArticlesError,
} from '../../../redux/user/selectors.js';

const MyArticles = () => {
  const dispatch = useDispatch();
  // Статті автора

  const authorArticles = useSelector(selectAuthorArticles);

  const currentPage = useSelector(selectAuthorArticlesPage);
  const totalPages = useSelector(selectAuthorArticlesPages);

  const isLoading = useSelector(selectAuthorArticlesLoading);

  const { id: ownerId } = useParams();

  const articles = authorArticles || [];

  useEffect(() => {
    if (ownerId && currentPage === 1) {
      dispatch(fetchArticlesAuthorById({ ownerId, page: 1 }));
    }
  }, [ownerId, currentPage, dispatch]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      dispatch(fetchArticlesAuthorById({ ownerId, page: currentPage + 1 }));
    }
  };

  return (
    <>
      {!isLoading && articles.length === 0 && <ProfileArticlesEmpty />}
      <ArticlesList
        icon={'icon-edit-article'}
        btnStyle={'EditArticle'}
        queryArticles={articles}
      />
      {totalPages > 1 && currentPage < totalPages && (
        <LoadMore
          page={currentPage}
          pages={totalPages}
          onLoadMore={handleLoadMore}
        />
      )}
    </>
  );
};

export default MyArticles;
