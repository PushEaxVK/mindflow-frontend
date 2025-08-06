import { logout } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { closeModal } from '../../redux/modal/slice.js';

import s from './ContentType.module.css';
import clsx from 'clsx';

const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success('You have been logged out');
    } catch (error) {
      toast.error('Logout failed: ' + error);
    } finally {
      dispatch(closeModal());
      navigate('/login');
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className={s.modal__wrapper}>
      <h2 className={s.modal__headline}>Are you sure?</h2>
      <p className={s.modal__text}>We will miss you!</p>
      <div className={s.modal__btns}>
        <button
          autoFocus
          className={clsx(s.modal__btn, s.primer)}
          onClick={handleSignOut}
        >
          Log out
        </button>
        <button onClick={handleCancel} className={clsx(s.modal__btn, s.second)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignOut;
