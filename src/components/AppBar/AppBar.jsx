import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import AuthNav from '../AuthNav/AuthNav';
import UserMenu from '../UserMenu/UserMenu';
import Container from '../Container/Container';
import s from './AppBar.module.css';
import { toggleModal } from '../../redux/modal/slice.js';

const AppBar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const handleToggleModal = () => {
    dispatch(toggleModal());
  };

  return (
    <header className={s.appbar}>
      <Container>
        <div className={s.appbar__wrapper}>
          <div className={s.logo}>
            <svg className={s.logo__icon}>
              <use href="/img/icons.svg#icon-logo-min"></use>
            </svg>
          </div>
          <div className={s.navigation__wrapper}>
            <nav className={s.nav}>
              <Navigation />
            </nav>
            {isLoggedIn ? <UserMenu /> : <AuthNav />}
            <button
              className={s.btn__burger}
              aria-label="Open menu"
              onClick={handleToggleModal}
            >
              <svg className={s.btn__icon}>
                <use href="/img/icons.svg#icon-burger-regular"></use>
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default AppBar;
