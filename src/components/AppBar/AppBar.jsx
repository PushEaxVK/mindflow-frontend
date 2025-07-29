import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { toggleModal } from '../../redux/modal/slice';

import Navigation from '../Navigation/Navigation';
import AuthNav from '../AuthNav/AuthNav';
import UserMenu from '../UserMenu/UserMenu';
import ButtonCreate from '../ButtonCreate/ButtonCreate';
import Container from '../Container/Container';

import s from './AppBar.module.css';
import clsx from 'clsx';

const AppBar = () => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 1440 });
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [burgerOpen, setBurgerOpen] = useState(false);

  const handleBurgerToggle = () => {
    setBurgerOpen(!burgerOpen);
    dispatch(toggleModal());
  };

  return (
    <header className={s.appbar}>
      <Container>
        <div className={s.wrapper}>
          <div className={s.logo} onClick={() => navigate('/')}>
            <svg className={s.logo__icon}>
              <use href="/img/icons.svg#icon-logo-min"></use>
            </svg>
          </div>

          {isDesktop && (
            <nav className={s.nav}>
              <Navigation />
              {isLoggedIn ? (
                <>
                  <ButtonCreate />
                  <UserMenu />
                </>
              ) : (
                <AuthNav />
              )}
            </nav>
          )}

          {isTablet && (
            <div className={s.actions}>
              {isLoggedIn ? <ButtonCreate /> : <AuthNav />}
              <button
                className={clsx(s.burger, { [s.open]: burgerOpen })}
                onClick={handleBurgerToggle}
                aria-label="Toggle menu"
              >
                <span className={s.line}></span>
                <span className={s.line}></span>
                <span className={s.line}></span>
              </button>
            </div>
          )}

          {isMobile && (
            <div className={s.mobile__only}>
              <button
                className={`${s.burger} ${burgerOpen ? s.open : ''}`}
                onClick={handleBurgerToggle}
                aria-label="Toggle menu"
              >
                <span className={s.line}></span>
                <span className={s.line}></span>
                <span className={s.line}></span>
              </button>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default AppBar;
