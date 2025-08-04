import s from './UserMenu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import UserAvatar from '../UserAvatar/UserAvatar.jsx';
import { closeModal, toggleModal } from '../../redux/modal/slice.js';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogoutModal = () => {
    dispatch(closeModal());

    setTimeout(() => {
      dispatch(toggleModal('SignOut'));
    }, 200);
  };

  return (
    <div className={s.user__menu}>
      <div className={s.user__wrapper}>
        <UserAvatar
          className={s.user__avatar}
          src={user?.avatarUrl}
          alt={`${user?.name}'s avatar`}
          name={user?.name}
        />
        <p className={s.user__name}>{user?.name}</p>
        <span className={s.user__divider} aria-hidden="true"></span>
        <button onClick={handleLogoutModal} className={s.btn__logout}>
          <svg className={s.btn__icon}>
            <use href="/img/icons.svg#icon-Vector-1"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
