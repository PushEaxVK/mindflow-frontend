import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader/Loader.jsx';
import ArticlesList from '../../ArticlesList/ArticlesList.jsx';
import { selectUser } from '../../../redux/auth/selectors.js';
import SavedArticlesEmpty from '../../SavedArticlesEmpty/SavedArticlesEmpty.jsx';
import { fetchSavedArticles } from '../../../redux/SavedArticles/operations.js';
import {
  selectSavedArticles,
  selectSavedArticlesLoading,
  selectSavedArticlesPage,
  selectSavedArticlesPages,
} from '../../../redux/SavedArticles/selectors.js';
import LoadMore from '../../LoadMore/LoadMore';

const SavedArticles = () => {
  const lastArticleRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const savedArticles = useSelector(selectSavedArticles);
  const isLoading = useSelector(selectSavedArticlesLoading);

  const currentPage = useSelector(selectSavedArticlesPage);
  const totalPages = useSelector(selectSavedArticlesPages);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchSavedArticles({ page: 1, userId: user.id }));
    }
  }, [dispatch, user]);

  const handleLoadMore = () => {
    //console.log('Load more clicked. Current page:', currentPage);
    if (currentPage < totalPages && !isLoading) {
      //  scroll-орієнтир
      if (lastArticleRef.current) {
        lastArticleRef.current.scrollIntoView({ behavior: 'auto' });
      }

      dispatch(fetchSavedArticles({ page: currentPage + 1 }));
    }
  };

  // if (isLoading) return <Loader />;

  //if (!savedArticles?.length) return <SavedArticlesEmpty />;

  return (
    <>
      {!isLoading && savedArticles.length === 0 && <SavedArticlesEmpty />}
      <ArticlesList
        queryArticles={savedArticles}
        icon="icon-favorite-article"
        btnStyle="FavoriteArticle"
        lastArticleRef={lastArticleRef}
      />
      {isLoading && (
        <div>
          <p>Чекайте! Статті зараз завантажуються ....</p>
        </div>
      )}
      {totalPages > 1 && currentPage < totalPages && !isLoading && (
        <LoadMore
          page={currentPage}
          pages={totalPages}
          onLoadMore={handleLoadMore}
        />
      )}
    </>
  );
};

export default SavedArticles;
