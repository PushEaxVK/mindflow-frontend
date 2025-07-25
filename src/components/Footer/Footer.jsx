import Container from '../Container/Container';
import css from './Footer.module.css'; // Import the CSS module for this component

const Footer = () => {
  return (
    <footer className={css.footer}>
      <Container>
        <p>© 2023 Your Company. All rights reserved.</p>
      </Container>
    </footer>
  );
};
export default Footer;
