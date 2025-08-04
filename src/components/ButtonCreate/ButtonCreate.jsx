import React from 'react';
import s from './ButtonCreate.module.css';
import { useNavigate } from 'react-router-dom';

const ButtonCreate = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate('/create')} className={s.btn__create}>
      Create an article
    </button>
  );
};

export default ButtonCreate;
