import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../Loader/Loader.jsx';
import ArticlesList from '../../ArticlesList/ArticlesList.jsx';

import { selectUser } from '../../../redux/auth/selectors.js';

import SavedArticlesEmpty from '../../SavedArticlesEmpty/SavedArticlesEmpty.jsx';
import { fetchSavedArticles } from '../../../redux/SavedArticles/operations.js';
import {
  selectSavedArticlesError,
  selectSavedArticlesLoading,
} from '../../../redux/SavedArticles/selectors.js';

const SavedArticles = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const savedArticles = useSelector(selectSavedArticlesError);
  const isLoading = useSelector(selectSavedArticlesLoading);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchSavedArticles(user.id));
    }
  }, [dispatch, user]);

  if (isLoading) return <Loader />;
  if (!savedArticles?.length) return <SavedArticlesEmpty />;

  return (
    <ArticlesList
      queryArticles={savedArticles}
      icon="icon-favorite-article"
      btnStyle="FavoriteArticle"
    />
  );
};

export default SavedArticles;
