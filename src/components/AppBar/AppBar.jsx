import { useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import AuthNav from '../AuthNav/AuthNav';
import UserMenu from '../UserMenu/UserMenu';

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div>
      <div>
        <div>
          <div>
            <Navigation />
          </div>
          <div>{isLoggedIn ? <UserMenu /> : <AuthNav />}</div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
