import NavigationLink from '../NavigationLink/NavigationLink';
import { Box } from '@mui/material';

const AuthNav = () => {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <NavigationLink to="/register">Register</NavigationLink>
      <NavigationLink to="/login">Login</NavigationLink>
    </Box>
  );
};
export default AuthNav;
