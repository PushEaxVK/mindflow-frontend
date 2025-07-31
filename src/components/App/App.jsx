import { useDispatch, useSelector } from 'react-redux';
import { useEffect, lazy, Suspense } from 'react';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import { refreshUser } from '../../redux/auth/operations';
import { Route, Routes } from 'react-router-dom';
import { RestrictedRoute } from '../RestrictedRoute';
import { PrivateRoute } from '../PrivateRoute';
import Layout from '../Layout/Layout';
import Loader from '../Loader/Loader';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const ArticlesPage = lazy(() =>
  import('../../pages/ArticlesPage/ArticlesPage')
);
const AuthorProfilePage = lazy(() =>
  import('../../pages/AuthorProfilePage/AuthorProfilePage')
);
const AuthorsPage = lazy(() => import('../../pages/AuthorsPage/AuthorsPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const MyProfilePage = lazy(() =>
  import('../../pages/MyProfilePage/MyProfilePage')
);
const ArticlePage = lazy(() => import('../../pages/ArticlePage/ArticlePage'));
const CreateArticlePage = lazy(() =>
  import('../../pages/CreateArticlePage/CreateArticlePage')
);
const UploadPhotoPage = lazy(() =>
  import('../../pages/UploadPhotoPage/UploadPhotoPage')
);
const UploadPhoto = lazy(() =>
  import('../../pages/UploadPhoto/UploadPhoto.jsx')
);
const RegisterPage = lazy(() =>
  import('../../pages/RegisterPage/RegisterPage')
);
const MyArticles = lazy(() => import('../nestedRoutes/MyArticles/MyArticles'));
const SavedArticles = lazy(() =>
  import('../nestedRoutes/SavedArticles/SavedArticles')
);
const NotFound = lazy(() => import('../../pages/NotFound/NotFound'));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? null : (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:id" element={<ArticlePage />} />
          <Route path="authors" element={<AuthorsPage />} />
          <Route path="authors/:id" element={<AuthorProfilePage />}>
            <Route
              path="my-articles"
              element={
                <PrivateRoute>
                  <MyArticles />
                </PrivateRoute>
              }
            />
            <Route
              path="saved-articles"
              element={
                <PrivateRoute>
                  <SavedArticles />
                </PrivateRoute>
              }
            />
          </Route>

          <Route
            path="register"
            element={
              <RestrictedRoute redirectTo="/" component={<RegisterPage />} />
            }
          />
          <Route
            path="create"
            element={
              <PrivateRoute redirectTo="/login">
                <CreateArticlePage />
              </PrivateRoute>
            }
          />
          <Route
            path="photo"
            element={
              <PrivateRoute redirectTo="/login" component={<UploadPhoto />} />
            }
          />
          <Route
            path="login"
            element={
              <RestrictedRoute redirectTo="/" component={<LoginPage />} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
