import React from 'react';
import styles from './RegisterForm.module.css';

const getStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[\W_]/.test(password)) score++;
  return score;
};

const PasswordStrengthBar = ({ password, confirmPassword }) => {
  const strength = getStrength(password);
  const isMatch = password && confirmPassword && password === confirmPassword;

  const getColor = (score) => {
    if (score <= 2) return 'red';
    if (score <= 4) return 'orange';
    return 'green';
  };

  return (
    <div className={styles.strengthWrapper}>
      <div className={styles.strengthBar}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={styles.segment}
            style={{
              backgroundColor: i < strength ? getColor(strength) : '#ddd',
            }}
          />
        ))}
      </div>
      <p className={styles.strengthText}>
        {password && (
          <>
            Strength:{' '}
            <strong>
              {['Very weak', 'Weak', 'Fair', 'Good', 'Strong'][strength - 1]}
            </strong>
          </>
        )}
        {confirmPassword && (
          <span
            style={{ marginLeft: '1rem', color: isMatch ? 'green' : 'red' }}
          >
            {isMatch ? 'Passwords match' : 'Passwords do not match'}
          </span>
        )}
      </p>
    </div>
  );
};

export default PasswordStrengthBar;
