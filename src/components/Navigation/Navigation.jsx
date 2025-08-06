import clsx from 'clsx';
import s from './Navigation.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const setActiveClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <nav className={s.nav}>
      <NavLink className={setActiveClass} to="/" end>
        Home
      </NavLink>
      <NavLink className={setActiveClass} to="/articles" end>
        Articles
      </NavLink>
      <NavLink className={setActiveClass} to="/authors" end>
        Creators
      </NavLink>
      {isLoggedIn && (
        <NavLink className={setActiveClass} to={`/authors/${user.id}`}>
          My Profile
        </NavLink>
      )}
    </nav>
  );
};
export default Navigation;
