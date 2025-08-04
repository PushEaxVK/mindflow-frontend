import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../redux/auth/operations';
import { selectIsLoggedIn, selectIsRefreshing } from '../redux/auth/selectors';

export const useAuthInitializer = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await dispatch(refreshUser()).unwrap();
      } catch (err) {
        if (
          err !== 'No valid session found' &&
          err !== 'No refresh token provided in cookies'
        ) {
          console.error('Unexpected refresh error:', err);
        }
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
