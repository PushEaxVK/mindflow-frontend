import s from './ModalMenu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalIsOpen } from '../../redux/modal/selectors.js';
import { closeModal } from '../../redux/modal/slice.js';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import Navigation from '../Navigation/Navigation.jsx';
import Container from '../Container/Container.jsx';
import UserMenu from '../UserMenu/UserMenu.jsx';
import AuthNav from '../AuthNav/AuthNav.jsx';

const ModalMenu = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectModalIsOpen);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  if (!isOpen) return null;

  return (
    <Container>
      <div className={s.modal_wrapper}>
        <div className={s.modal}>
          <div className={s.appbar__wrapper}>
            <div className={s.logo}>
              <svg className={s.logo__icon}>
                <use href="/img/icons.svg#icon-logo-min"></use>
              </svg>
            </div>
          </div>
          <button className={s.btn__close} onClick={handleCloseModal}>
            <svg className={s.btn__icon}>
              <use href="/img/icons.svg#icon-close"></use>
            </svg>
          </button>
        </div>
        <div className={s.navigation__wrapper}>
          <nav className={s.nav} onClick={handleCloseModal}>
            <Navigation />
          </nav>

          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </div>
      </div>
    </Container>
  );
};

export default ModalMenu;
