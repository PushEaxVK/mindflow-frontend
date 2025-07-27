import { useDispatch, useSelector } from 'react-redux';
import { useEffect, lazy, Suspense } from 'react';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import { refreshUser } from '../../redux/auth/operations';
import { Route, Routes } from 'react-router-dom';
import { RestrictedRoute } from '../RestrictedRoute';
import { PrivateRoute } from '../PrivateRoute';
import Layout from '../Layout/Layout';
import Loader from '../Loader/Loader.jsx';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const ArticlesPage = lazy(() =>
  import('../../pages/ArticlesPage/ArticlesPage.jsx')
);
const AuthorsPage = lazy(() =>
  import('../../pages/AuthorsPage/AuthorsPage.jsx')
);
const AuthorPage = lazy(() => import('../../pages/AuthorPage/AuthorPage.jsx'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage.jsx'));
const MyProfilePage = lazy(() =>
  import('../../pages/MyProfilePage/MyProfilePage.jsx')
);
const ArticlePage = lazy(() =>
  import('../../pages/ArticlePage/ArticlePage.jsx')
);
const UploadPhotoPage = lazy(() =>
  import('../../pages/UploadPhotoPage/UploadPhotoPage.jsx')
);

const RegisterPage = lazy(() =>
  import('../../pages/RegisterPage/RegisterPage.jsx')
);
const MyArticles = lazy(() =>
  import('../nestedRoutes/MyArticles/MyArticles.jsx')
);
const SavedArticles = lazy(() =>
  import('../nestedRoutes/SavedArticles/SavedArticles.jsx')
);
const NotFound = lazy(() => import('../../pages/NotFound/NotFound.jsx'));

function App() {
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
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/authors/:id" element={<AuthorPage />} />

          <Route
            path="/profile"
            element={
              <PrivateRoute redirectTo="/login" component={<MyProfilePage />} />
            }
          >
            <Route path="my-articles" element={<MyArticles />} />
            <Route path="saved-articles" element={<SavedArticles />} />
          </Route>
          <Route
            path="register"
            element={
              <RestrictedRoute redirectTo="/" component={<RegisterPage />} />
            }
          />
          <Route
            path="login"
            element={
              <RestrictedRoute redirectTo="/" component={<LoginPage />} />
            }
          />

          <Route
            path="/photo"
            element={
              <PrivateRoute
                redirectTo="/login"
                component={<UploadPhotoPage />}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

{
  /* <Route
            path="/profile"
            element={
              <PrivateRoute redirectTo="/login" component={<MyProfilePage />} />
            }
          /> */
}
