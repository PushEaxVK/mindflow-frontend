import { useDispatch, useSelector } from 'react-redux';
import SearchBox from '../../components/SearchBox/SearchBox';
import { selectError, selectLoading } from '../../redux/contacts/selectors';
import ContactList from '../../components/ContactList/ContactList';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contacts/operations';

const ContactsPage = () => {
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <SearchBox />
      {isLoading && !error && <b>Loading contacts...</b>}
      {error && <b>{error}</b>}
      <ContactList />
    </div>
  );
};

export default ContactsPage;
