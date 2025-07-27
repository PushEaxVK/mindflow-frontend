import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    toast.error('This is a private page for logged users');
  }
  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};
