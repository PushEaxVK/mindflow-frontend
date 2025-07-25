import styles from './Hero.module.css';

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Find your <span className={styles.italic}>harmony</span> in community
        </h1>
        <div className={styles.buttons}>
          <button className={styles.primary}>
            <a href="#popular-articles" className={styles.btn}>
              Go to Articles
            </a>
          </button>
          <button className={styles.secondary}>
            <a href="#register" className={styles.btn2}>
              Register
            </a>
          </button>
        </div>
      </div>
      <div className={styles.image}></div>
    </section>
  );
}

export default Hero;
