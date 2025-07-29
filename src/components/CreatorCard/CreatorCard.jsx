import React from 'react';
import styles from './CreatorCard.module.css';
import clsx from 'clsx';

function CreatorCard({ creator, page = 'home' }) {
  if (!creator) return null;

  const isLarge = page === 'creators';

  return (
    <div
      className={clsx(
        styles.creatorCard,
        isLarge && styles['creatorCard--lg'],
        styles[`page--${page}`]
      )}
    >
      <img
        src={creator.avatarUrl}
        alt={creator.name}
        className={clsx(styles.avatar, isLarge && styles['avatar--lg'])}
      />
      <p className={styles.name}>{creator.name?.split(' ')[0]}</p>
    </div>
  );
}

export default CreatorCard;
