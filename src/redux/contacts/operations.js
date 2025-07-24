import { createAsyncThunk } from '@reduxjs/toolkit';

import contactsApi from '../../services/api';

export const createThunk = (action, fetchData) => {
  return createAsyncThunk(action, async (body, thunkAPI) => {
    try {
      const response = await fetchData(body, thunkAPI);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
};

export const fetchContacts = createThunk('contacts/fetchAll', async () =>
  contactsApi.contacts.contactsGetAll()
);

export const addContact = createThunk('contacts/addContact', async (contact) =>
  contactsApi.contacts.contactsAddNew(contact)
);

export const deleteContact = createThunk(
  'contacts/deleteContact',
  async (contactId) =>
    contactsApi.contacts.contactsDeleteById({ id: contactId })
);
