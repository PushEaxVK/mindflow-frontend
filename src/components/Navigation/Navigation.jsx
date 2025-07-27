import clsx from 'clsx';
import s from './Navigation.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const setActiveClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <nav className={s.nav}>
      <NavLink className={setActiveClass} to="/">
        Home
      </NavLink>
      <NavLink className={setActiveClass} to="/articles">
        Articles
      </NavLink>
      <NavLink className={setActiveClass} to="/authors">
        Creators
      </NavLink>
      {isLoggedIn && (
        <NavLink className={setActiveClass} to="/profile">
          My Profile
        </NavLink>
      )}
    </nav>
  );
};
export default Navigation;
