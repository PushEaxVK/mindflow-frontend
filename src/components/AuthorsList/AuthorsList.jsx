import AuthorsItem from '../AuthorsItem/AuthorsItem.jsx';
import s from './AuthorsList.module.css';

const AuthorsList = ({ authors }) => {
  return (
    <ul className={s.list}>
      {authors.map((author) => (
        <AuthorsItem key={author._id} author={author} />
      ))}
    </ul>
  );
};

export default AuthorsList;
