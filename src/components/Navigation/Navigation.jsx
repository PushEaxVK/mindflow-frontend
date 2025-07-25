// import { useSelector } from 'react-redux';
// import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div>
      <NavLink to="/">Home</NavLink>

      {/* {isLoggedIn && <NavLink to="/some-route">Some route</NavLink} */}
    </div>
  );
};
export default Navigation;
