import { Link } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NavigationLink = ({ to = '/', children }) => {
  return (
    <Link
      component={NavLink}
      to={to}
      underline="hover"
      color="inherit"
      sx={{
        '&.active': { textDecoration: 'underline', color: '#d4e157' },
        fontSize: '1.25rem',
      }}
    >
      {children}
    </Link>
  );
};

export default NavigationLink;
