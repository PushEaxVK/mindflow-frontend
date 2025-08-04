import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import s from './AuthNav.module.css';
import { useMediaQuery } from 'react-responsive';

const AuthNav = () => {
  const setActiveClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  const isDesktop = useMediaQuery({ minWidth: 1440 });

  return (
    <nav className={s.wrapper}>
      {isDesktop && (
        <NavLink className={setActiveClass} to="/login">
          Log In
        </NavLink>
      )}
      <NavLink className={clsx(s.link, s.join__link)} to="/register">
        Join now
      </NavLink>
    </nav>
  );
};

export default AuthNav;
