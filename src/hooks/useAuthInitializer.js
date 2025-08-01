// hooks/useAuthInitializer.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../redux/auth/operations';
import { setAuthHeader } from '../services/api';
import { selectIsLoggedIn, selectIsRefreshing } from '../redux/auth/selectors';

export const useAuthInitializer = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setIsInitialized(true);
        return;
      }

      try {
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        if (exp > Date.now() / 1000) {
          setAuthHeader(token);
        }
        await dispatch(refreshUser()).unwrap();
      } catch {
        localStorage.removeItem('accessToken');
      } finally {
        setIsInitialized(true);
      }
    };

    if (!isLoggedIn && !isRefreshing && !isInitialized) {
      init();
    } else if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [dispatch, isLoggedIn, isRefreshing, isInitialized]);

  return isInitialized;
};
