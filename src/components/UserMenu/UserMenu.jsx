import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';
import { Box, Button, Typography } from '@mui/material';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Typography variant="h6">Welcome, {user.name}</Typography>
      <Button
        onClick={() => dispatch(logout())}
        variant="contained"
        color="secondary"
        sx={{
          fontSize: '1rem',
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default UserMenu;
