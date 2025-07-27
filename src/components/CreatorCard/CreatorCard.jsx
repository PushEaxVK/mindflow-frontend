import React from 'react';
import styles from './CreatorCard.module.css';

function CreatorCard({ creator }) {
  if (!creator) return null;

  return (
    <div className={styles.creatorCard}>
      <img
        src={creator.avatarUrl}
        alt={creator.name}
        className={styles.avatar}
      />
      <p className={styles.name}>{creator.name?.split(' ')[0]}</p>
    </div>
  );
}

export default CreatorCard;
