import Container from '../Container/Container';
import css from './Footer.module.css'; // Import the CSS module for this component

const Footer = () => {
  return (
    <footer className={css.footer}>
    <Container noVerticalPadding>
      <div className={css.inner}>
        <svg className={css.logo}>
              <use href="/img/icons.svg#icon-logo-min"></use>
            </svg>
        <p className={css.copyright}>© 2025 Harmoniq. All rights reserved.</p>
        <nav className={css.links}>
          <ul className={css.linkList}>
            <li><Link to="/articles" className={css.link}>Articles</Link></li>
            <li><Link to="/account" className={css.link}>Account</Link></li>
          </ul>
        </nav>
      </div>
      </Container>
      </footer>
  );
};

export default Footer; 
