import Container from '../../components/Container/Container';
import Hero from '../../components/Hero/Hero.jsx';
import AboutUs from '../../components/AboutUs/AboutUs.jsx';
import PopularArticles from '../../components/PopularArticles/PopularArticles.jsx';
import TopCreators from '../../components/TopCreators/TopCreators.jsx';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <section className={styles.HomePage}>
      <Container>
        <Hero />
        <AboutUs />
        <PopularArticles />
        <TopCreators />
      </Container>
    </section>
  );
};

export default HomePage;
