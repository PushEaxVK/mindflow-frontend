import { useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import AuthNav from '../AuthNav/AuthNav';
import UserMenu from '../UserMenu/UserMenu';
import Container from '../Container/Container';
import css from './AppBar.module.css';

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={css.appbar}>
      <Container>
        <div>
          <Navigation />
        </div>
        <div>{isLoggedIn ? <UserMenu /> : <AuthNav />}</div>
      </Container>
    </header>
  );
};

export default AppBar;
