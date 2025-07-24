import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import { useState } from 'react';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const handleRemove = () => {
    dispatch(deleteContact(contact.id));
    setOpenDialog(false);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1.5,
          px: 2,
          width: '100%',
        }}
      >
        <Stack spacing={0.5}>
          <Typography
            variant="body1"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
            {contact.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <PhoneIcon sx={{ mr: 1, color: 'secondary.main' }} />
            {contact.number}
          </Typography>
        </Stack>
        <IconButton
          onClick={() => setOpenDialog(true)}
          aria-label={`Delete ${contact.name}`}
        >
          <DeleteIcon />
        </IconButton>

        <ConfirmDelete
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={handleRemove}
          contactName={contact.name}
        />
      </Box>
    </>
  );
};

export default Contact;
