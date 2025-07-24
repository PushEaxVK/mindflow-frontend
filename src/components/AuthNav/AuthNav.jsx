import NavigationLink from '../NavigationLink/NavigationLink';

const AuthNav = () => {
  return (
    <div>
      <NavigationLink to="/register">Register</NavigationLink>
      <NavigationLink to="/login">Login</NavigationLink>
    </div>
  );
};

export default AuthNav;
