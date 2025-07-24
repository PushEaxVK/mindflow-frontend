import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './operations';
import { logout } from '../auth/operations';
import toast from 'react-hot-toast';

const initialState = { items: [], isLoading: false, error: null };

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action, error) => {
  state.isLoading = false;
  state.error = action.payload;
  if (error) toast.error(error);
};

const handleFulfilled = (state, succes) => {
  state.isLoading = false;
  state.error = null;
  if (succes) toast.success(succes);
};

const buildCase = (builder) => {
  const result = {
    addCase: (thunk, fn, toastMsg) => {
      return buildCase(
        builder
          .addCase(thunk.pending, handlePending)
          .addCase(thunk.fulfilled, (state, action) => {
            handleFulfilled(state, toastMsg.success);
            return fn(state, action);
          })
          .addCase(thunk.rejected, (state, succes) =>
            handleRejected(state, succes, toastMsg.error)
          )
      );
    },
  };
  return result;
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: (builder) => {
    buildCase(builder.addCase(logout.fulfilled, () => initialState))
      .addCase(
        fetchContacts,
        (state, action) => {
          state.items = action.payload;
        },
        { success: 'Contacts loaded!', error: 'Error when loading contacts!' }
      )
      .addCase(
        addContact,
        (state, action) => {
          state.items.push(action.payload);
        },
        { success: 'Contacts is created!', error: 'Error creating contact!' }
      )
      .addCase(
        deleteContact,
        (state, action) => {
          state.items = state.items.filter(
            (contact) => contact.id !== action.payload.id
          );
        },
        { success: 'Contact is deleted!', error: 'Error deleting contact!' }
      );
  },
});

export default slice.reducer;
