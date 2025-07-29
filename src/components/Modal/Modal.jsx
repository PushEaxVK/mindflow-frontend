import s from './Modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectModalIsOpen,
  selectModalType,
} from '../../redux/modal/selectors.js';

import { useEffect } from 'react';
import SignOut from '../ContentTypes/SignOut.jsx';
import ErrorSave from '../ContentTypes/ErrorSave.jsx';
import { closeModal } from '../../redux/modal/slice.js';

const MODAL_CONTENT = {
  SignOut: SignOut,
  ErrorSave: ErrorSave,
};
const Modal = () => {
  const dispatch = useDispatch();
  const modalType = useSelector(selectModalType);
  const isOpen = useSelector(selectModalIsOpen);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        dispatch(closeModal());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  const handleClose = () => dispatch(closeModal());

  const ModalContent = MODAL_CONTENT[modalType];

  if (!isOpen || !ModalContent) return null;
  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className={s.overlay} onClick={handleClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={handleCancel} className={s.btn__close}>
          <svg className={s.btn__icon}>
            <use href="/img/icons.svg#icon-close"></use>
          </svg>
        </button>
        <ModalContent onClose={handleClose} />
      </div>
    </div>
  );
};

export default Modal;
