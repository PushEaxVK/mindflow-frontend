import { useNavigate } from 'react-router-dom';
import s from './AuthorsItem.module.css';

const AuthorsItem = ({ author }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/authors/${author._id}`);
  };

  return (
    <li className={s.item} onClick={handleClick}>
      <img
        src={author.avatarUrl || '/default-avatar.jpg'}
        alt={author.name}
        className={s.imgProfile}
      />
      <p className={s.name}>{author.name}</p>
    </li>
  );
};

export default AuthorsItem;
