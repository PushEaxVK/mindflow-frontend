import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import NavigationLink from '../NavigationLink/NavigationLink';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div>
      <NavigationLink to="/">Home</NavigationLink>

      {isLoggedIn && <NavigationLink to="/contacts">Contacts</NavigationLink>}
    </div>
  );
};
export default Navigation;
