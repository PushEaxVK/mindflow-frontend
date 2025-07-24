// import { useDispatch } from 'react-redux';
// import { deleteContact } from '../../redux/contacts/operations';
import { useState } from 'react';
// import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';

const Contact = ({ contact }) => {
  // const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  // const handleRemove = () => {
  //   dispatch(deleteContact(contact.id));
  //   setOpenDialog(false);
  // };

  return (
    <>
      <div>
        <div>
          <p>
            &#x1F464;
            {contact.name}
          </p>
          <p>
            &#x1F4DE;
            {contact.number}
          </p>
        </div>
        <button
          onClick={() => setOpenDialog(true)}
          aria-label={`Delete ${contact.name}`}
        >
          &#x1F5D1;
        </button>

        {/* <ConfirmDelete
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={handleRemove}
          contactName={contact.name}
        /> */}
      </div>
    </>
  );
};

export default Contact;
