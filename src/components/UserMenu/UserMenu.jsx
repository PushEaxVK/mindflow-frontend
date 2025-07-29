import s from './UserMenu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
// import { logout } from '../../redux/auth/operations';
import UserAvatar from '../UserAvatar/UserAvatar.jsx';
import { toggleModal } from '../../redux/modal/slice.js';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  // const handleLogout = () => {
  //   dispatch(logout());
  // };
  const handleLogoutModal = () => {
    dispatch(toggleModal('SignOut'));
  };

  return (
    <div className={s.user__menu}>
      <div className={s.user__wrapper}>
        <UserAvatar
          className={s.user__avatar}
          src={user.avatarUrl}
          alt={`${user.name}'s avatar`}
          name={user.name}
        />
        <p className={s.user__name}>{user.name}</p>
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
