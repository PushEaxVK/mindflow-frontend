import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import NavigationLink from '../NavigationLink/NavigationLink';
import { Box } from '@mui/material';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Box component="nav" sx={{ display: 'flex', gap: 2 }}>
      <NavigationLink to="/">Home</NavigationLink>

      {isLoggedIn && <NavigationLink to="/contacts">Contacts</NavigationLink>}
    </Box>
  );
};
export default Navigation;
