import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { refreshUser } from '../redux/auth/operations';

export const useAuthInitializer = () => {
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      const hasCookies =
        document.cookie.includes('refreshToken') ||
        document.cookie.includes('sessionId');

      if (hasCookies) {
        try {
          await dispatch(refreshUser()).unwrap();
        } catch {
          //auth slice
        }
      }

      setIsInitialized(true);
    };

    if (!isInitialized) {
      init();
    }
  }, [dispatch, isInitialized]);

  return isInitialized;
};
