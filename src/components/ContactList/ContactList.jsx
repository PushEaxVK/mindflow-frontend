import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import { selectFilteredContacts } from '../../redux/contacts/selectors';
import { Divider, List, ListItem } from '@mui/material';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <List sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 3 }}>
      {filteredContacts.map((contact, index) => (
        <ListItem
          key={contact.id}
          disablePadding
          sx={{ flexDirection: 'column', alignItems: 'stretch' }}
        >
          <Contact contact={contact} />
          {index < filteredContacts.length - 1 && <Divider />}
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;
