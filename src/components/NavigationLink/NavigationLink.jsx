import { NavLink } from 'react-router-dom';

const NavigationLink = ({ to = '/', children }) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        textDecoration: isActive ? 'underline' : 'none',
        color: isActive ? '#d4e157' : 'inherit',
        fontSize: '1.25rem',
      })}
    >
      {children}
    </NavLink>
  );
};

export default NavigationLink;
