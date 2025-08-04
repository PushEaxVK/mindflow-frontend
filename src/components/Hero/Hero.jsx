import styles from './Hero.module.css';
import { Link } from 'react-router-dom';
import Container from '../Container/Container.jsx';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';

function Hero() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <section className={styles.hero}>
      <Container noVerticalPadding>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Find your <span className={styles.italic}>harmony</span> in
            community
          </h1>
          <div className={styles.buttons}>
            <a href="#popular-articles" className={styles.primary}>
              Go to Articles
            </a>
            {!isLoggedIn && (
              <Link to="/register" className={styles.secondary}>
                Register
              </Link>
            )}
          </div>
        </div>
        <div className={styles.image}></div>
      </Container>
    </section>
  );
}

export default Hero;
