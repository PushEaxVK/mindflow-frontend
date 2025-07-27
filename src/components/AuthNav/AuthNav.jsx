import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import s from './AuthNav.module.css';

const AuthNav = () => {
  return (
    <div className={s.wrapper}>
      <NavLink className={clsx(s.link, s.login__link)} to="/login">
        Log In
      </NavLink>
      <NavLink className={clsx(s.link, s.join__link)} to="/register">
        Join now
      </NavLink>
    </div>
  );
};

export default AuthNav;
