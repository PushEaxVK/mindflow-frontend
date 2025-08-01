import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../redux/auth/operations';

export const useAutoRefresh = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, accessToken } = useSelector(state => state.auth);
  const refreshTimeoutRef = useRef(null);

  useEffect(() => {
    if (!isLoggedIn || !accessToken) {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }
      return;
    }

    try {
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const expiresAt = payload.exp;
      
      const refreshAt = expiresAt - 120; // 2 minutes before
      const timeUntilRefresh = (refreshAt - currentTime) * 1000;

      if (timeUntilRefresh > 0) {
        refreshTimeoutRef.current = setTimeout(async () => {
          try {
            await dispatch(refreshUser()).unwrap();
          } catch {
            console.log('Auto-refresh failed');
          }
        }, timeUntilRefresh);
      } else {
        dispatch(refreshUser());
      }
    } catch {
      console.log('Invalid token format for auto-refresh');
    }

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }
    };
  }, [isLoggedIn, accessToken, dispatch]);
};