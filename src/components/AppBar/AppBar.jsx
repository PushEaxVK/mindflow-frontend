import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { closeModal, toggleModal } from '../../redux/modal/slice';
import {
  selectModalIsOpen,
  selectModalType,
} from '../../redux/modal/selectors';

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

  const isOpen = useSelector(selectModalIsOpen);
  const modalType = useSelector(selectModalType);
  const isBurgerMenuOpen = isOpen && modalType === 'mobileMenu';

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBurgerToggle = () => {
    dispatch(toggleModal('mobileMenu'));
  };

  const handleLogoClick = () => {
    dispatch(closeModal());
    navigate('/');
  };

  return (
    <header className={s.appbar}>
      <Container>
        <div className={s.wrapper}>
          <div className={s.logo} onClick={handleLogoClick}>
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

          {(isTablet || isMobile) && (
            <div className={isTablet ? s.actions : s.mobile__only}>
              {isTablet && (isLoggedIn ? <ButtonCreate /> : <AuthNav />)}

              <button
                className={clsx(s.burger, { [s.open]: isBurgerMenuOpen })}
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
