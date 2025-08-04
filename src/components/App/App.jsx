import { useDispatch, useSelector } from 'react-redux';
import { useEffect, lazy, Suspense } from 'react';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import { refreshUser } from '../../redux/auth/operations';
import { Route, Routes } from 'react-router-dom';
import { RestrictedRoute } from '../RestrictedRoute';
import { PrivateRoute } from '../PrivateRoute';
import Layout from '../Layout/Layout';
import Loader from '../../components/Loader/Loader.jsx';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const ArticlePage = lazy(() =>
  import('../../pages/ArticlePage/ArticlePage.jsx')
);
const ArticlesPage = lazy(() =>
  import('../../pages/ArticlesPage/ArticlesPage.jsx')
);
const AuthorProfilePage = lazy(() =>
  import('../../pages/AuthorProfilePage/AuthorProfilePage.jsx')
);
const AuthorsPage = lazy(() =>
  import('../../pages/AuthorsPage/AuthorsPage.jsx')
);
const CreateArticlePage = lazy(() =>
  import('../../pages/CreateArticlePage/CreateArticlePage.jsx')
);
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage.jsx'));
const RegisterPage = lazy(() =>
  import('../../pages/RegisterPage/RegisterPage.jsx')
);
const UploadPhoto = lazy(() =>
  import('../../pages/UploadPhoto/UploadPhoto.jsx')
);

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:id" element={<ArticlePage />} />
          <Route path="authors" element={<AuthorsPage />} />
          <Route path="authors/:id" element={<AuthorProfilePage />} />

          <Route
            path="create"
            element={
              <PrivateRoute
                redirectTo="/login"
                component={<CreateArticlePage />}
              />
            }
          />
          <Route
            path="upload-photo"
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
          <Route
            path="register"
            element={
              <RestrictedRoute redirectTo="/photo" component={<RegisterPage />} />
            }
          />

          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
