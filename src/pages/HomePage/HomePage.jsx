import { Box, Typography } from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';

const HomePage = () => {
  return (
    <Box textAlign="center">
      <Typography variant="h4" component="h1">
        <ContactsIcon sx={{ color: 'primary.main' }} />
        &nbsp;Contact Book
      </Typography>

      <Typography variant="h6" color="text.secondary" paragraph>
        This is your personal contact book. You can:
      </Typography>

      <Box textAlign="left" maxWidth="sm" mx="auto" mb={4}>
        <ul style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          <li>Save important contacts with name and phone number</li>
          <li>Search, filter, and edit your contacts</li>
          <li>Secure your data with authentication</li>
        </ul>
      </Box>
    </Box>
  );
};

export default HomePage;
