import { useDispatch, useSelector } from 'react-redux';
import { useEffect, lazy, Suspense } from 'react';
import { selectIsRefreshing } from '../../redux/auth/selectors';
import { refreshUser } from '../../redux/auth/operations';
import { Route, Routes } from 'react-router-dom';
import { RestrictedRoute } from '../RestrictedRoute';
import { PrivateRoute } from '../PrivateRoute';
import Layout from '../Layout/Layout';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const AuthorProfilePage = lazy(() =>
  import('../../pages/AuthorProfilePage/AuthorProfilePage')
);
const MyArticles = lazy(() =>
  import('../../components/nestedRoutes/MyArticles')
);
const SavedArticles = lazy(() =>
  import('../../components/nestedRoutes/SavedArticles')
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? null : (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/authors/:id" element={<AuthorProfilePage />}>
          <Route path="my-articles" element={<MyArticles />} />
          <Route path="saved-articles" element={<SavedArticles />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
