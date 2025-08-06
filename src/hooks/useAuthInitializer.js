import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../redux/auth/operations';
import { selectIsLoggedIn } from '../redux/auth/selectors';
import { clearAuth } from '../redux/auth/slice';

export const useAuthInitializer = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (isLoggedIn) {
        try {
          await dispatch(refreshUser()).unwrap();
        } catch {
          dispatch(clearAuth());
        }
      }
      setIsInitialized(true);
    };

    if (!isInitialized) {
      init();
    }
  }, [dispatch, isInitialized, isLoggedIn]);

  return isInitialized;
};
