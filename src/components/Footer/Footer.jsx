import Container from '../Container/Container';
import css from './Footer.module.css'; // Import the CSS module for this component

const Footer = () => {
  return (
    <Container noVerticalPadding>
    <footer className={css.footer}>
      <div className={css.inner}>
        <div className={css.logo}>harmoniq</div>
        <p className={css.copyright}>© 2025 Harmoniq. All rights reserved.</p>
        <nav className={css.links}>
          <ul className={css.linkList}>
            <li><Link to="/articles" className={css.link}>Articles</Link></li>
            <li><Link to="/account" className={css.link}>Account</Link></li>
          </ul>
        </nav>
      </div>
      </footer>
      </Container>
  );
};

export default Footer; 

