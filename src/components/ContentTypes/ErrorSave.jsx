import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from './ContentType.module.css';
import clsx from 'clsx';
import { closeModal } from '../../redux/modal/slice.js';

const ErrorSave = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(closeModal());
    navigate('/login');
  };

  const handleRegister = () => {
    dispatch(closeModal());
    navigate('/register');
  };

  return (
    <div className={s.modal__wrapper}>
      <h2 className={s.modal__headline}>Error while saving</h2>
      <p className={s.modal__text}>
        To save this article, you need to authorize first
      </p>
      <div className={s.modal__btns}>
        <button className={clsx(s.modal__btn, s.second)} onClick={handleLogin}>
          Login
        </button>
        <button
          className={clsx(s.modal__btn, s.primer)}
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default ErrorSave;
