import s from './UserAvatar.module.css';

const UserAvatar = ({ src, alt, name }) => {
  const firstLetter = name?.[0]?.toUpperCase() || '?';
  return src && src.trim() !== '' ? (
    <img src={src} alt={alt} className={s.user__avatar} />
  ) : (
    <div className={s.avatar__letter}>{firstLetter}</div>
  );
};

export default UserAvatar;
