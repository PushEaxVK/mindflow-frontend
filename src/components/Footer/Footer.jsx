import Container from '../Container/Container';
import css from './Footer.module.css'; // Import the CSS module for this component

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.inner}>
        <div className={css.logo}>harmoniq</div>
        <p className={css.copyright}>© 2025 Harmoniq. All rights reserved.</p>
        <nav className={css.links}>
          <ul className={css.linkList}>
            <li><a href="#articles" className={css.link}>Articles</a></li>
            <li><a href="#account" className={css.link}>Account</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
